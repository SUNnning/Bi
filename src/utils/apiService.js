export const fetchEditData = async () => {
  try {
    const response = await fetch('/newEdit.json')
    return await response.json()
  } catch (error) {
    console.error('Error fetching edit data:', error)
    throw error
  }
}
