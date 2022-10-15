// 快速判断formData和newValue是否相等
// 1.如果相等，直接return
// 2.如果不相等，遍历newValue，将不相等的属性赋值给formData
export function updataObj(val1: any, val2: any) {
  if (JSON.stringify(val1) === JSON.stringify(val2)) {
    return
  }
  for (const key in val2) {
    ;(val1 as any)[key] = val2[key]
  }
}
