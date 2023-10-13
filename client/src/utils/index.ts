/** deadline 파라미터를 받아 현재 시간과의 차이를 반환 */
export const daysLeft = (deadline: string) => {
 const difference = new Date(deadline).getTime() - Date.now()
 const remainingDays = difference / (1000 * 3600 * 24)

 return remainingDays.toFixed(0)
}

/**  이미지인지 확인용 */
export const checkIfImage = (
 url: string,
 callback: (isImg: boolean) => void,
) => {
 const img = new Image()
 img.src = url

 if (img.complete) {
  callback(true)
 }

 img.onload = () => {
  callback(true)
 }

 img.onerror = () => {
  callback(false)
 }
}

/** 현재 펀딩 달성액 / 목표 펀딩 금액 */
export const calculateBarPercentage = (goal: number, raisedAmount: number) => {
 const percentage = Math.round((raisedAmount * 100) / goal)

 return percentage > 100 ? 100 : percentage
}
