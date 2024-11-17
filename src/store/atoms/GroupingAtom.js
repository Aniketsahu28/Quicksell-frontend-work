import { atom } from "recoil"
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

export const groupingAtom = atom({
    key: "groupingAtom",
    default: "Status",
    effects_UNSTABLE: [persistAtom],
})