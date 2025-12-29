'use client'

import { Album, AlbumItem, AlbumType } from '@/type/wezard/albums'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getAlbumDetail } from '@/api'
import { timestampToUTCString } from '@/utils/date'
import { useI18n } from '@/i18n'

interface PhotoDetailProps {
  photo: Album
  onClose: () => void
}

export default function PhotoDetail({ photo, onClose }: PhotoDetailProps) {
  const { dict } = useI18n()
  const [images, setImages] = useState<AlbumItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showZoomModal, setShowZoomModal] = useState(false)

  useEffect(() => {
    getAlbumDetail({ type: AlbumType.IMAGE, id: photo.id })
      .then((res) => {
        setImages(res)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [photo.id])

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
  }

  const handleImageClick = () => {
    setShowZoomModal(true)
  }

  const handleCloseZoom = () => {
    setShowZoomModal(false)
  }

  const handleZoomPrevious = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
  }

  const handleZoomNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
  }

  const currentImage = images[currentIndex]

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-40">
        <div className="overflow-y-auto bg-gray-900 w-full h-full overflow-hidden flex flex-col">
          {/* 头部信息 */}
          <div className="sticky top-0 z-10 bg-gray-900 bg-opacity-95 backdrop-blur-sm border-gray-700 px-6 py-4 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">{photo.name}</h2>
              {photo.description && (
                <p className="text-sm text-gray-400 mt-1">{photo.description}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {timestampToUTCString(photo.releaseDate, 'date')} · {images.length}{' '}
                {dict.common.imagesCount}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-800"
            >
              ✕
            </button>
          </div>

          {/* 图片展示区域 */}
          <div className="flex flex-col items-center justify-center flex-1 p-6">
            {currentImage && (
              <div className="relative max-w-4xl w-full h-full">
                {/* 主图片 */}
                <div
                  className="relative h-[90%] w-full cursor-pointer group"
                  onClick={handleImageClick}
                >
                  <Image
                    src={currentImage.url}
                    alt={currentImage.name}
                    fill
                    className="h-full w-auto object-contain rounded-lg"
                    priority
                  />
                </div>

                {/* 导航按钮 */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                      aria-label={dict.common.previous}
                    >
                      <span className="text-xl">◀</span>
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                      aria-label={dict.common.next}
                    >
                      <span className="text-xl">▶</span>
                    </button>
                  </>
                )}

                {/* 图片信息 */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-400 mt-1">
                    {currentIndex + 1} / {images.length}
                  </p>
                </div>
              </div>
            )}

            {/* 缩略图导航 */}
            {images.length > 1 && (
              <div className="mt-8 max-w-4xl w-full">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {images.map((image, index) => (
                    <div
                      key={image.id}
                      onClick={() => setCurrentIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                        index === currentIndex
                          ? 'border-white scale-110'
                          : 'border-transparent hover:border-gray-500 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={image.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 放大弹窗 */}
      {showZoomModal && currentImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
          onClick={handleCloseZoom}
        >
          <div className="relative max-w-[95vw] max-h-[95vh] w-full h-full flex items-center justify-center">
            {/* 关闭按钮 */}
            <button
              onClick={handleCloseZoom}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors text-3xl w-12 h-12 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-10 z-10"
              aria-label={dict.common.close}
            >
              ✕
            </button>

            {/* 放大图片 */}
            <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
              <Image
                src={currentImage.url}
                alt={currentImage.name}
                width={1920}
                height={1080}
                className="max-w-full max-h-[95vh] object-contain"
                priority
              />
            </div>

            {/* 导航按钮 */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handleZoomPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
                  aria-label={dict.common.previous}
                >
                  <span className="text-2xl">◀</span>
                </button>
                <button
                  onClick={handleZoomNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
                  aria-label={dict.common.next}
                >
                  <span className="text-2xl">▶</span>
                </button>
              </>
            )}

            {/* 图片信息 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-6 py-3 rounded-lg text-center z-10">
              <p className="text-sm text-gray-300 mt-1">
                {currentIndex + 1} / {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
