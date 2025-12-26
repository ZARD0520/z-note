import { SelectItem } from '@/type/common/component'

export const getModelList = (dict: any): SelectItem[] => [
  {
    key: '1',
    label: dict.chat.model.xunfeiLite,
  },
  {
    key: '2',
    label: dict.chat.model.gpt4,
    disabled: true,
  },
  {
    key: '3',
    label: dict.chat.model.zhipuGlm,
  },
  {
    key: '999',
    label: dict.chat.model.moreModels,
    disabled: true,
  },
]

export const getRoleList = (dict: any): SelectItem[] => [
  {
    key: '1',
    label: dict.chat.role.zarder,
  },
  {
    key: '2',
    label: dict.chat.role.frontendZ,
  },
  {
    key: '3',
    label: dict.chat.role.catSecretary,
  },
]
