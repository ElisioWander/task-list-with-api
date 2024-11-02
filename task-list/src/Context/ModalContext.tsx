import { createContext, ReactNode, useContext, useState } from 'react'

type ModalContextData<T> = {
  isOpenMdal: boolean
  data?: T | null
  handleOpenModal: (data?: T | null) => void
  handleCloseModal: () => void
}

interface ModalContextPrviderProps {
  children: ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ModalContext = createContext({} as ModalContextData<any>)

export function ModalContextPrvider<T>({ children }: ModalContextPrviderProps) {
  const [isOpenMdal, setIsOpenModal] = useState(false)
  const [data, setData] = useState<T | null | undefined>(null)

  function handleOpenModal(_data?: T | null) {
    const toggleModal = !isOpenMdal

    setIsOpenModal(toggleModal)
    setData(_data)
  }

  function handleCloseModal() {
    setIsOpenModal(false)
  }

  return (
    <ModalContext.Provider
      value={{
        data,
        isOpenMdal,
        handleOpenModal,
        handleCloseModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export function useModal<T>() {
  return useContext<ModalContextData<T>>(ModalContext)
}
