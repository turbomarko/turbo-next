export const calculateAge = (birthday: string | Date) => {
  if (!birthday) return "XX";
  const today = new Date();
  const birthDate = new Date(birthday);
  return today.getFullYear() - birthDate.getFullYear();
}

export const generatePromoCode = (length: number): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const codeLength = length || 8; // Default length is 8 characters
  let promoCode = "";

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    promoCode += characters.charAt(randomIndex);
  }

  return promoCode;
}
