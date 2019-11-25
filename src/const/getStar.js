import { queryStarSug } from '@/api/star'

var allStars = []
queryStarSug().then(response => {
  let result = response.data
  if (result.success) {
    result.data.star_data.forEach(item => {
      allStars.push({
        value: item.star_name,
        star_id: item.star_id
      })
    })
  } else {
    console.log(result.message)
  }
  return allStars
})

export { allStars }

export function getAllStar() {
  return new Promise((resolve, reject) => {
    var allStars = []
    return queryStarSug()
      .then(response => {
        let result = response.data
        if (result.success) {
          result.data.star_data.forEach(item => {
            allStars.push({
              value: item.star_name,
              star_id: item.star_id
            })
          })
        } else {
          console.log(result.message)
        }
        return resolve(allStars)
      })
      .catch((error) => {
        return reject(error)
      })
  })
}
