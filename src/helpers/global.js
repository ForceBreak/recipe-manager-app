import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { $storage } from '@/main'

const levels = {
  Easy: 'rgb(125 211 252)',
  Normal: 'rgb(37 99 235)',
  Hard: 'rgb(248 113 113)',
  'Extra master': 'rgb(127 29 29)'
}
const steps = ['First', 'Second', 'Third', 'Another one']

const uploadFile = async ({ id, file }) => {
  const storageRef = ref($storage, id)
  const result = await uploadBytes(storageRef, file)
  const image = await getDownloadURL(result.ref)
  return image
}
const removeFile = ({ id }) => {
  const desertRef = ref($storage, id)

  deleteObject(desertRef)
    .then(() => {})
    .catch((error) => {
      console.log(error)
    })
}

export { levels, steps, uploadFile, removeFile }
