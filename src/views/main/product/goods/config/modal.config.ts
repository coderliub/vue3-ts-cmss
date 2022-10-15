import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  title: '商品列表',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '商品名称',
      placeholder: '请输入商品名称'
    },
    {
      field: 'oldPrice',
      type: 'input',
      label: '原价格',
      placeholder: '请输入原价格'
    },
    {
      field: 'newPrice',
      type: 'input',
      label: '现价格',
      placeholder: '请输入现价格'
    },
    {
      field: 'imgUrl',
      type: 'input',
      label: '商品图片',
      placeholder: '请输入商品图片'
    }
  ],
  colLayout: { span: 24 },
  itemStyle: { padding: 0 }
}
