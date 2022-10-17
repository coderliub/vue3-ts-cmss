import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '新建菜单',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '菜单名称',
      rules: [],
      placeholder: '请输入菜单名称'
    },
    {
      field: 'type',
      type: 'input',
      label: '菜单级别',
      rules: [],
      placeholder: '请输入菜单级别'
    },
    {
      field: 'url',
      type: 'input',
      label: '菜单url',
      rules: [],
      placeholder: '请输入菜单url'
    },
    {
      field: 'icon',
      type: 'input',
      label: '菜单icon',
      rules: [],
      placeholder: '请输入菜单icon'
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
