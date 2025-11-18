// 頁面載入時：自動讀取 localStorage 中的生日
window.addEventListener("DOMContentLoaded", () => {
  const savedDate = localStorage.getItem("dogBirthDate");
  if (savedDate) {
    document.getElementById("birthDate").value = savedDate;
  }
});

document.getElementById("calc").addEventListener("click", function () {
  const birthDateInput = document.getElementById("birthDate");
  const birthDateValue = birthDateInput.value;

  if (!birthDateValue) {
    alert("請輸入狗狗的出生日期！");
    return;
  }

  // 儲存到 localStorage
  localStorage.setItem("dogBirthDate", birthDateValue);

  const today = new Date();
  const birthDate = new Date(birthDateValue);

  if (birthDate > today) {
    alert("出生日期不能是未來！");
    return;
  }

  // 🐶 計算狗狗實際年齡
  const diffTime = today - birthDate;
  const dogAge = diffTime / (1000 * 60 * 60 * 24 * 365.25);

  // 👨‍🦳 換算人類歲數（科學文獻公式）
  let humanAge = 16 * Math.log(dogAge) + 31;

  // 🎂 計算下一次生日倒數
  const birthMonth = birthDate.getMonth();
  const birthDay = birthDate.getDate();

  let nextBirthday = new Date(today.getFullYear(), birthMonth, birthDay);
  if (nextBirthday < today) nextBirthday.setFullYear(today.getFullYear() + 1);

  const daysDiff = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

  // 顯示結果
  document.getElementById("result").textContent = dogAge.toFixed(2) + " 歲";
  document.getElementById("result2").textContent = humanAge.toFixed(1) + " 歲";
  document.getElementById("birthday").textContent = `還有 ${daysDiff} 天 🎉`;

  // ==========================
  // 🎉 生日進度條計算
  // ==========================
  let lastBirthday = new Date(today.getFullYear(), birthMonth, birthDay);
  if (lastBirthday > today) lastBirthday.setFullYear(today.getFullYear() - 1);

  const totalYearMs = nextBirthday - lastBirthday;
  const passedMs = today - lastBirthday;

  let progress = (passedMs / totalYearMs) * 100;
  if (progress > 100) progress = 100;

  document.getElementById("progressBar").style.width = progress + "%";
});
