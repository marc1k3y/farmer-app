type option = { _id: string, name: string, iso?: string }

export interface IDropdownProps {
  options: option[],
  current: string,
  setCurrent: (id: string) => void
}