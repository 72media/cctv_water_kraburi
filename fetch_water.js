// fetch_water.js
const fs = require('fs');

const CAMERAS = ['RNG01', 'RNG02', 'RNG03', 'RNG04', 'RNG05'];

async function fetchData() {
  let results = {};
  for (const code of CAMERAS) {
    try {
      const res = await fetch('https://cctv.disaster.go.th/api/v1/stations/' + code);
      if (res.ok) {
        const d = await res.json();
        // ดึงค่าตามโครงสร้างเดิมในโค้ดของคุณ
        const level = d.currentWaterLevel != null ? d.currentWaterLevel : (d.waterLevel ? d.waterLevel.current : null);
        const bank = d.riverBankLevel != null ? d.riverBankLevel : (d.waterThreshold ? d.waterThreshold.bankLevel : null);
        results[code] = { level, bank };
      }
    } catch (e) {
      console.log('Error fetching', code);
    }
  }
  
  // บันทึกเป็นไฟล์ JSON
  fs.writeFileSync('water_levels.json', JSON.stringify(results, null, 2));
}
fetchData();
