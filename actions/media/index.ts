'use server'

import { getListParams, MediaFile } from '@/type/actions/media';
import * as fs from 'fs';
import * as path from 'path';

const MEDIA_BASE_PATH = path.join(process.cwd(), 'public', 'media');
const METADATA_FILE = path.join(MEDIA_BASE_PATH, 'metadata.json');

const MEDIA_CONFIG = {
  Photos: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'],
  Albums: ['.mp3', '.wav', '.ogg', '.m4a', '.flac'],
  Videos: ['.mp4', '.avi', '.mov', '.mkv', '.webm']
};

export async function getMediaList(params: getListParams) {
  const metadata = await getMediaMetadata()
  const list = await scanMediaType(params.type, metadata)

  return list?.filter((item, index) => (index >= (params.current - 1) * params.size) && (index < params.current * params.size))
}

async function getMediaMetadata() {
  if (!fs.existsSync(METADATA_FILE)) {
    return {};
  }

  try {
    const data = await fs.promises.readFile(METADATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('读取元数据文件失败:', error);
    return {};
  }
}

async function scanMediaType(
  type: keyof typeof MEDIA_CONFIG,
  metadata: Record<string, MediaFile>
) {
  const typePath = path.join(MEDIA_BASE_PATH, type);
  const files: MediaFile[] = [];

  if (!fs.existsSync(typePath)) {
    console.warn(`目录不存在: ${typePath}`);
    return [];
  }

  const scanDirectory = (dir: string, relativePath: string = '') => {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const itemRelativePath = path.join(relativePath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDirectory(fullPath, itemRelativePath);
      } else {
        const metadataKey = `${type}/${itemRelativePath}`;
        const existingMetadata = metadata[metadataKey];

        files.push(existingMetadata);
      }
    }
  }

  scanDirectory(typePath)
  return files;
}