import { createContext, useContext } from 'react'

type ModalCtx = { openModal: () => void }

export const ModalContext = createContext<ModalCtx>({ openModal: () => {} })

export const useModal = () => useContext(ModalContext)
