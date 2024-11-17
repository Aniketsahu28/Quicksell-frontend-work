import { atom } from "recoil"
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

export const orderingAtom = atom({
    key: "orderingAtom",
    default: "Priority",
    effects_UNSTABLE: [persistAtom],
})