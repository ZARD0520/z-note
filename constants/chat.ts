import { SelectItem } from '@/type/common/component'

export const modelList: SelectItem[] = [
  {
    key: '1',
    label: '讯飞Lite',
  },
  {
    key: '2',
    label: 'GPT4',
    disabled: true,
  },
  {
    key: '3',
    label: '智谱GLM-4.5',
  },
  {
    key: '999',
    label: '更多模型，敬请期待',
    disabled: true,
  },
]

export const roleList: SelectItem[] = [
  {
    key: '1',
    label: 'ZARDer',
  },
  {
    key: '2',
    label: '前端小Z',
  },
  {
    key: '3',
    label: '猫咪小秘',
  },
]
