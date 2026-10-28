/**
 * 2026 한국해양대학교 가을 대동제 초청장 (Interactive App Script)
 * - Opening Envelope Animation
 * - Student Verification & Referral Share
 * - Dynamic 1000-Tickets Pool (Without Replacement)
 * - Lovely Autumn Random Blind Date (Insta vs Phone Matching)
 * - FAQ & Realtime Seats Refresh
 */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 0. Envelope Opening Intro Animation
  initEnvelopeIntro();

  // 1. Autumn Falling Leaves Canvas
  initLeavesCanvas();

  // 2. D-Day Countdown (2026-10-28 10:00)
  initCountdown();

  // 3. Day 1 / Day 2 Lineup Tabs
  initDayTabs();

  // 4. Student Verification & Referral Code Generation / Share
  initStudentAuth();

  // 5. Real-time Seats Capacity & Refresh System (Max 1,000)
  initSeatsAndReferral();

  // 6. Dynamic Non-Replacement Lottery Pool (1000장 소진 & 꽝 나올수록 확률 상승)
  initDynamicLottery();

  // 7. Lovely Autumn Random Blind Date (인스타는 인스타끼리, 번호는 번호끼리)
  initBlindDate();

  // 8. RSVP & Mobile Ticket
  initRSVPForm();

  // 9. General Share Button
  initShare();
});

/* ==========================================================================
   0. Envelope Opening Animation Modal
   ========================================================================== */
function initEnvelopeIntro() {
  const overlay = document.getElementById('envelopeOverlay');
  const envelopeBox = document.getElementById('envelopeBox');
  const waxSeal = document.getElementById('waxSeal');
  const reopenBtn = document.getElementById('reopenEnvelopeBtn');

  if (!overlay || !envelopeBox) return;

  function openEnvelope() {
    envelopeBox.classList.add('opening');

    setTimeout(() => {
      overlay.classList.add('opened');
      triggerBigConfetti();
      showToast('💌 2026 한국해양대 가을 대동제에 오신 것을 환영합니다!');
    }, 750);
  }

  envelopeBox.addEventListener('click', openEnvelope);
  if (waxSeal) waxSeal.addEventListener('click', openEnvelope);

  if (reopenBtn) {
    reopenBtn.addEventListener('click', () => {
      envelopeBox.classList.remove('opening');
      overlay.classList.remove('opened');
    });
  }
}

/* ==========================================================================
   1. Falling Leaves Canvas
   ========================================================================== */
function initLeavesCanvas() {
  const canvas = document.getElementById('leavesCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const leaves = [];
  const leafCount = 18;
  const leafColors = [
    'rgba(231, 111, 81, 0.65)',
    'rgba(244, 162, 97, 0.65)',
    'rgba(233, 196, 106, 0.7)',
    'rgba(158, 42, 43, 0.6)'
  ];

  class Leaf {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = Math.random() * 8 + 6;
      this.speedX = Math.random() * 1.2 - 0.6;
      this.speedY = Math.random() * 0.9 + 0.4;
      this.color = leafColors[Math.floor(Math.random() * leafColors.length)];
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 1.5 - 0.75;
      this.angle = Math.random() * Math.PI * 2;
    }
    update() {
      this.angle += 0.02;
      this.x += this.speedX + Math.sin(this.angle) * 0.6;
      this.y += this.speedY;
      this.rotation += this.rotationSpeed;

      if (this.y > height + 20 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(0, -this.size);
      ctx.bezierCurveTo(this.size * 0.8, -this.size * 0.3, this.size * 0.8, this.size * 0.8, 0, this.size);
      ctx.bezierCurveTo(-this.size * 0.8, this.size * 0.8, -this.size * 0.8, -this.size * 0.3, 0, -this.size);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < leafCount; i++) {
    leaves.push(new Leaf());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    leaves.forEach(l => {
      l.update();
      l.draw();
    });
    requestAnimationFrame(render);
  }
  render();
}

/* ==========================================================================
   2. D-Day Countdown
   ========================================================================== */
function initCountdown() {
  const targetTime = new Date('2026-10-28T10:00:00+09:00').getTime();
  const dEl = document.getElementById('days');
  const hEl = document.getElementById('hours');
  const mEl = document.getElementById('mins');
  const sEl = document.getElementById('secs');

  function update() {
    const now = new Date().getTime();
    const diff = targetTime - now;

    if (diff <= 0) {
      if (dEl) dEl.textContent = '00';
      if (hEl) hEl.textContent = '00';
      if (mEl) mEl.textContent = '00';
      if (sEl) sEl.textContent = '00';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    if (dEl) dEl.textContent = String(d).padStart(2, '0');
    if (hEl) hEl.textContent = String(h).padStart(2, '0');
    if (mEl) mEl.textContent = String(m).padStart(2, '0');
    if (sEl) sEl.textContent = String(s).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   3. Day Tabs Switcher
   ========================================================================== */
function initDayTabs() {
  const tabs = document.querySelectorAll('.day-tab-btn');
  const list1 = document.getElementById('day1List');
  const list2 = document.getElementById('day2List');

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const day = btn.getAttribute('data-day');
      tabs.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');

      if (day === 'day1') {
        list1.classList.add('active');
        list2.classList.remove('active');
      } else {
        list1.classList.remove('active');
        list2.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. Student Verification & Referral Code Generation / Share
   ========================================================================== */
function initStudentAuth() {
  const authForm = document.getElementById('studentAuthForm');
  const verifyBox = document.getElementById('studentVerifyBox');
  const resultBox = document.getElementById('verifiedResultBox');
  const authStudentName = document.getElementById('authStudentName');
  const authStudentDept = document.getElementById('authStudentDept');
  const refCodeEl = document.getElementById('studentGeneratedRefCode');
  const btnCopy = document.getElementById('btnCopyMyRef');
  const btnShare = document.getElementById('btnShareMyRef');
  const inviteCountEl = document.getElementById('studentInviteCount');

  const savedStudent = localStorage.getItem('kmou_student_auth');
  if (savedStudent) {
    try {
      const data = JSON.parse(savedStudent);
      renderStudentAuthUI(data);
    } catch (e) {}
  }

  function renderStudentAuthUI(data) {
    if (authStudentName) authStudentName.textContent = data.name;
    if (authStudentDept) authStudentDept.textContent = data.dept;
    if (refCodeEl) refCodeEl.textContent = data.refCode;

    const count = parseInt(localStorage.getItem(`ref_used_${data.refCode}`) || '0', 10);
    if (inviteCountEl) inviteCountEl.textContent = count;

    if (verifyBox) verifyBox.classList.add('hidden');
    if (resultBox) resultBox.classList.remove('hidden');
  }

  if (authForm) {
    authForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('stuName').value.trim();
      const id = document.getElementById('stuId').value.trim();
      const dept = document.getElementById('stuDept').value;

      if (!name || !id || !dept) {
        showToast('모든 항목을 입력해주세요.');
        return;
      }

      const refCode = `KMOU-${id}`;

      const studentData = {
        name,
        id,
        dept,
        refCode,
        verifiedAt: new Date().toISOString()
      };

      localStorage.setItem('kmou_student_auth', JSON.stringify(studentData));
      renderStudentAuthUI(studentData);
      showToast('🎉 한국해양대 재학생 인증이 완료되었습니다!');
      triggerBigConfetti();
    });
  }

  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      const code = refCodeEl.textContent;
      navigator.clipboard
        .writeText(code)
        .then(() => {
          showToast(`📋 추천인 코드(${code})가 복사되었습니다! 친구에게 공유하세요.`);
        })
        .catch(() => {
          showToast(`추천코드: ${code}`);
        });
    });
  }

  if (btnShare) {
    btnShare.addEventListener('click', () => {
      const code = refCodeEl.textContent;
      const shareData = {
        title: '2026 한국해양대학교 가을 대동제 초청장',
        text: `[한국해양대 축제] 재학생 ${authStudentName.textContent}님이 보낸 추천인 코드: [ ${code} ]\n초청장 등록 시 입력하고 함께 즐겨요!`,
        url: window.location.href
      };

      if (navigator.share) {
        navigator.share(shareData).catch(() => {});
      } else {
        navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`).then(() => {
          showToast('🔗 추천인 코드와 초청장 링크가 복사되었습니다!');
        });
      }
    });
  }
}

/* ==========================================================================
   5. Real-time Seats Capacity & Refresh System (Max 1,000 Seats)
   ========================================================================== */
const MAX_CAPACITY = 1000;
let currentReserved = parseInt(localStorage.getItem('kmou_reserved_seats') || '864', 10);

function initSeatsAndReferral() {
  updateSeatUI();

  const applyBtn = document.getElementById('applyReferralBtn');
  const refInput = document.getElementById('referralInput');
  const refHint = document.getElementById('refHintText');
  const refreshBtn = document.getElementById('refreshSeatsBtn');

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      refreshBtn.classList.add('spinning');
      
      setTimeout(() => {
        const delta = Math.floor(Math.random() * 3) + 1;
        increaseSeatCount(delta);
        refreshBtn.classList.remove('spinning');
        showToast(`🔄 실시간 잔여석이 새로고침 되었습니다. (현재 ${currentReserved}명 / 1,000명)`);
      }, 450);
    });
  }

  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const code = refInput.value.trim().toUpperCase();
      if (!code) {
        showToast('⚠️ 추천인 코드를 입력해주세요.');
        return;
      }

      const usedRef = localStorage.getItem('kmou_applied_ref');
      if (usedRef === code) {
        showToast('이미 적용된 추천인 코드입니다.');
        return;
      }

      let count = parseInt(localStorage.getItem(`ref_used_${code}`) || '0', 10);
      if (count >= 2) {
        showToast('⚠️ 해당 추천인 코드는 최대 2명 초대가 마감되었습니다.');
        return;
      }

      count += 1;
      localStorage.setItem(`ref_used_${code}`, count);
      localStorage.setItem('kmou_applied_ref', code);

      increaseSeatCount(1);

      refHint.textContent = `✅ [${code}] 재학생 추천인 코드가 정상 적용되었습니다! (예약 +1)`;
      refHint.style.color = '#15803d';

      const studentInviteCount = document.getElementById('studentInviteCount');
      if (studentInviteCount) studentInviteCount.textContent = count;

      showToast(`🎉 추천인 코드가 인증되었습니다! (현재 예약: ${currentReserved}명)`);
      triggerMiniConfetti();
    });
  }
}

function increaseSeatCount(amount = 1) {
  if (currentReserved < MAX_CAPACITY) {
    currentReserved = Math.min(MAX_CAPACITY, currentReserved + amount);
    localStorage.setItem('kmou_reserved_seats', currentReserved);
    updateSeatUI();
  }
}

function updateSeatUI() {
  const currentEl = document.getElementById('currentReservedCount');
  const remainEl = document.getElementById('remainSeatsCount');
  const fillBar = document.getElementById('seatFillBar');

  const remain = MAX_CAPACITY - currentReserved;
  const percentage = (currentReserved / MAX_CAPACITY) * 100;

  if (currentEl) currentEl.textContent = currentReserved.toLocaleString();
  if (remainEl) remainEl.textContent = remain.toLocaleString();
  if (fillBar) fillBar.style.width = `${percentage}%`;
}

/* ==========================================================================
   6. Dynamic Non-Replacement Lottery Pool (Without Replacement)
   ========================================================================== */
const INITIAL_LOTTERY_STATE = {
  totalTickets: 1000,
  p1: 1,
  p2: 2,
  p3: 3,
  p4: 4,
  p5: 5
};

let lotteryState = JSON.parse(
  localStorage.getItem('kmou_dynamic_lottery') || JSON.stringify(INITIAL_LOTTERY_STATE)
);

function getRemainingPrizesTotal() {
  return lotteryState.p1 + lotteryState.p2 + lotteryState.p3 + lotteryState.p4 + lotteryState.p5;
}

function getRemainingMissCount() {
  return Math.max(0, lotteryState.totalTickets - getRemainingPrizesTotal());
}

function getCurrentWinRate() {
  if (lotteryState.totalTickets <= 0) return 0;
  return (getRemainingPrizesTotal() / lotteryState.totalTickets) * 100;
}

function updateLotteryUI() {
  const remainTotalEl = document.getElementById('remainTotalTickets');
  const currentWinRateEl = document.getElementById('currentWinRate');
  const poolBarFill = document.getElementById('poolBarFill');
  const remainPrizeTotalEl = document.getElementById('remainPrizeTotal');
  const remainMissCountEl = document.getElementById('remainMissCount');
  const winRateComment = document.getElementById('winRateComment');

  const r1 = document.getElementById('remainP1');
  const r2 = document.getElementById('remainP2');
  const r3 = document.getElementById('remainP3');
  const r4 = document.getElementById('remainP4');
  const r5 = document.getElementById('remainP5');

  if (r1) r1.textContent = lotteryState.p1;
  if (r2) r2.textContent = lotteryState.p2;
  if (r3) r3.textContent = lotteryState.p3;
  if (r4) r4.textContent = lotteryState.p4;
  if (r5) r5.textContent = lotteryState.p5;

  const total = lotteryState.totalTickets;
  const prizes = getRemainingPrizesTotal();
  const misses = getRemainingMissCount();
  const rate = getCurrentWinRate();

  if (remainTotalEl) remainTotalEl.textContent = total.toLocaleString();
  if (currentWinRateEl) currentWinRateEl.textContent = `${rate.toFixed(2)}%`;
  if (poolBarFill) poolBarFill.style.width = `${(total / 1000) * 100}%`;
  if (remainPrizeTotalEl) remainPrizeTotalEl.textContent = prizes;
  if (remainMissCountEl) remainMissCountEl.textContent = misses.toLocaleString();

  if (winRateComment) {
    if (total <= 0) {
      winRateComment.textContent = '모든 표가 소진되었습니다';
    } else if (prizes === 0) {
      winRateComment.textContent = '모든 경품이 당첨되었습니다';
    } else if (rate > 1.5) {
      winRateComment.textContent = `초기 1.50% 대비 +${(rate - 1.5).toFixed(2)}%p 상승! 🔥`;
    } else {
      winRateComment.textContent = '꽝 발생 시 실시간 상승 📈';
    }
  }
}

function initDynamicLottery() {
  updateLotteryUI();

  const drawBtn = document.getElementById('drawPrizeBtn');
  const slot1 = document.getElementById('slotNum1');
  const slot2 = document.getElementById('slotNum2');
  const slot3 = document.getElementById('slotNum3');
  const slot4 = document.getElementById('slotNum4');
  const slots = [slot1, slot2, slot3, slot4];

  const resultCard = document.getElementById('lotteryResultCard');
  const resIcon = document.getElementById('resIcon');
  const resTitle = document.getElementById('resTitle');
  const resDesc = document.getElementById('resDesc');
  const myLotteryCode = document.getElementById('myLotteryCode');
  const rateBoostNotice = document.getElementById('rateBoostNotice');
  const btnAdminReset = document.getElementById('btnAdminResetPrizes');

  if (btnAdminReset) {
    btnAdminReset.addEventListener('click', () => {
      if (
        confirm(
          '⚙️ [관리자 모드]\n전체 추첨표 1,000장과 경품(1등 1개, 2등 2개, 3등 3개, 4등 4개, 5등 5개) 및 당첨 확률(1.50%)을 초기 상태로 완전 리셋하시겠습니까?'
        )
      ) {
        lotteryState = JSON.parse(JSON.stringify(INITIAL_LOTTERY_STATE));
        localStorage.setItem('kmou_dynamic_lottery', JSON.stringify(lotteryState));
        updateLotteryUI();
        if (resultCard) resultCard.classList.add('hidden');
        showToast('🛠️ 추첨표 1,000장 및 경품 수량이 완전히 초기화되었습니다.');
      }
    });
  }

  if (!drawBtn) return;

  let isDrawing = false;

  drawBtn.addEventListener('click', () => {
    if (isDrawing) return;

    if (lotteryState.totalTickets <= 0) {
      showToast('⚠️ 준비된 추첨표 1,000장이 모두 소진되었습니다!');
      return;
    }

    isDrawing = true;
    drawBtn.disabled = true;
    drawBtn.innerHTML = '<span>추첨함에서 번호표 뽑는 중... 🍁</span>';

    resultCard.classList.add('hidden');
    if (rateBoostNotice) rateBoostNotice.classList.add('hidden');
    slots.forEach(s => s.classList.add('rolling'));

    let count = 0;
    const interval = setInterval(() => {
      slots.forEach(s => {
        s.textContent = Math.floor(Math.random() * 10);
      });
      count++;
      if (count > 20) {
        clearInterval(interval);
        finalizeDraw();
      }
    }, 70);
  });

  function finalizeDraw() {
    const finalDigits = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10)
    ];

    slots.forEach((s, idx) => {
      s.textContent = finalDigits[idx];
      s.classList.remove('rolling');
    });

    const ticketNumber = `KMOU-${finalDigits.join('')}`;
    if (myLotteryCode) myLotteryCode.textContent = ticketNumber;

    const currentTotal = lotteryState.totalTickets;
    const R = Math.floor(Math.random() * currentTotal) + 1;

    let wonRank = 0;
    const p1End = lotteryState.p1;
    const p2End = p1End + lotteryState.p2;
    const p3End = p2End + lotteryState.p3;
    const p4End = p3End + lotteryState.p4;
    const p5End = p4End + lotteryState.p5;

    if (lotteryState.p1 > 0 && R <= p1End) {
      wonRank = 1;
      lotteryState.p1 -= 1;
    } else if (lotteryState.p2 > 0 && R <= p2End) {
      wonRank = 2;
      lotteryState.p2 -= 1;
    } else if (lotteryState.p3 > 0 && R <= p3End) {
      wonRank = 3;
      lotteryState.p3 -= 1;
    } else if (lotteryState.p4 > 0 && R <= p4End) {
      wonRank = 4;
      lotteryState.p4 -= 1;
    } else if (lotteryState.p5 > 0 && R <= p5End) {
      wonRank = 5;
      lotteryState.p5 -= 1;
    } else {
      wonRank = 0;
    }

    lotteryState.totalTickets = Math.max(0, lotteryState.totalTickets - 1);
    localStorage.setItem('kmou_dynamic_lottery', JSON.stringify(lotteryState));

    updateLotteryUI();

    const newRate = getCurrentWinRate().toFixed(2);

    if (wonRank === 1) {
      resIcon.textContent = '🚗';
      resTitle.textContent = '대박! [1등] 현대 자동차 캐스퍼 당첨!';
      resDesc.textContent = `축하합니다! 단 1대뿐인 1등 자동차 당첨! (남은 추첨표: ${lotteryState.totalTickets}장)`;
      triggerBigConfetti();
    } else if (wonRank === 2) {
      resIcon.textContent = '📺';
      resTitle.textContent = '축하합니다! [2등] LG 스탠바이미 당첨!';
      resDesc.textContent = `2명 한정 스마트 가전 당첨! 종합안내소에서 수령하세요. (남은 추첨표: ${lotteryState.totalTickets}장)`;
      triggerBigConfetti();
    } else if (wonRank === 3) {
      resIcon.textContent = '💻';
      resTitle.textContent = '환호! [3등] Apple M3 맥북 에어 당첨!';
      resDesc.textContent = `3명 한정 M3 맥북 에어 당첨! 본부석을 방문해주세요. (남은 추첨표: ${lotteryState.totalTickets}장)`;
      triggerBigConfetti();
    } else if (wonRank === 4) {
      resIcon.textContent = '🎧';
      resTitle.textContent = '당첨! [4등] 에어팟 프로 2세대 당첨!';
      resDesc.textContent = `4명 한정 에어팟 프로 당첨! 축제 안내부스에서 수령하세요. (남은 추첨표: ${lotteryState.totalTickets}장)`;
      triggerBigConfetti();
    } else if (wonRank === 5) {
      resIcon.textContent = '☕';
      resTitle.textContent = '당첨! [5등] 스타벅스 3만원 상품권 당첨!';
      resDesc.textContent = `5명 한정 스타벅스 상품권! 신청 연락처로 발송됩니다. (남은 추첨표: ${lotteryState.totalTickets}장)`;
      triggerMiniConfetti();
    } else {
      resIcon.textContent = '🍂';
      resTitle.textContent = '아쉽게도 꽝입니다!';
      resDesc.textContent = `이번 표는 꽝입니다. 꽝 1장이 빠져나가 남은 표는 ${lotteryState.totalTickets}장이 되었습니다.`;
      if (rateBoostNotice && lotteryState.totalTickets > 0 && getRemainingPrizesTotal() > 0) {
        rateBoostNotice.innerHTML = `<i data-lucide="trending-up"></i> <span>꽝 1장이 제외되어 다음 당첨 확률이 <strong>${newRate}%</strong>로 상승했습니다! 📈</span>`;
        rateBoostNotice.classList.remove('hidden');
        if (window.lucide) window.lucide.createIcons();
      }
    }

    resultCard.classList.remove('hidden');
    drawBtn.disabled = false;
    drawBtn.innerHTML = '<i data-lucide="sparkles"></i> 번호표 1장 다시 뽑기 (표 차감 & 확률 상승)';
    if (window.lucide) window.lucide.createIcons();
    isDrawing = false;
  }
}

/* ==========================================================================
   🌟 7. Lovely Autumn Random Blind Date Matching
   - 인스타는 인스타끼리, 번호는 번호끼리
   - 내 인스타 입력 시 -> 상대방 '카리나 (@katarinabluu)' 매칭 예시
   - 내 번호 입력 시 -> 상대방 전화번호 매칭
   ========================================================================== */
function initBlindDate() {
  const form = document.getElementById('blindDateForm');
  const contactRadios = document.querySelectorAll('input[name="contactType"]');
  const contactLabel = document.getElementById('loveContactLabel');
  const contactInput = document.getElementById('loveContact');
  const contactHint = document.getElementById('loveContactHint');

  const matchedCard = document.getElementById('loveMatchedCard');
  const matchedAvatar = document.getElementById('matchedAvatar');
  const matchedName = document.getElementById('matchedName');
  const matchedDept = document.getElementById('matchedDept');
  const matchedIntro = document.getElementById('matchedIntro');
  const matchedContactLabel = document.getElementById('matchedContactLabel');
  const matchedContactVal = document.getElementById('matchedContactVal');
  const btnConnect = document.getElementById('btnConnectDirect');
  const connectBtnText = document.getElementById('connectBtnText');
  const btnRematch = document.getElementById('btnRematchLove');

  if (!form) return;

  // Toggle Contact Input Placeholder & Label
  contactRadios.forEach(radio => {
    radio.addEventListener('click', () => {
      if (radio.value === 'insta') {
        contactLabel.innerHTML = '내 인스타그램 아이디 <span class="req">*</span>';
        contactInput.placeholder = '예: @my_instagram_id';
        contactInput.type = 'text';
        contactHint.textContent = '인스타를 선택하시면 인스타 사용자끼리 매칭됩니다.';
      } else {
        contactLabel.innerHTML = '내 휴대폰 번호 <span class="req">*</span>';
        contactInput.placeholder = '예: 010-1234-5678';
        contactInput.type = 'tel';
        contactHint.textContent = '전화번호를 선택하시면 전화번호 사용자끼리 매칭됩니다.';
      }
    });
  });

  // Sample Pool for Matching
  const instaProfilesFemale = [
    {
      name: '카리나 (Karina)',
      dept: '해사대학',
      intro: '"가을 바다 노을 보면서 같이 잔나비 떼창 부를 인연을 찾아요! 🫧"',
      avatar: '👑',
      contact: '@katarinabluu',
      link: 'https://instagram.com/katarinabluu'
    },
    {
      name: '윈터 (Winter)',
      dept: '해양과학기술대',
      intro: '"푸드트럭 타코야끼 사주실 따뜻한 분 구해요 🤍 (ISFP)"',
      avatar: '❄️',
      contact: '@iamwinter',
      link: 'https://instagram.com/iamwinter'
    }
  ];

  const instaProfilesMale = [
    {
      name: '차은우 (Eunwoo)',
      dept: '해양인문사회대',
      intro: '"축제 불꽃놀이 명당 같이 가실 분! 편하게 디엠 주세요 ✨"',
      avatar: '🌟',
      contact: '@eunwo.o_c',
      link: 'https://instagram.com/eunwo.o_c'
    }
  ];

  const phoneProfiles = [
    {
      name: '아치 낭만러',
      dept: '해사대학 23학번',
      intro: '"가을밤 대운동장에서 같이 돗자리 펴고 공연 봐요! 연락주세요 🍂"',
      avatar: '🌊',
      contact: '010-7729-1028',
      link: 'tel:01077291028'
    },
    {
      name: '바다 산책러',
      dept: '해양공학과',
      intro: '"밤바다 버스킹 듣는 거 좋아해요! 먼저 문자 주시면 답장할게요 💌"',
      avatar: '🎸',
      contact: '010-4821-2026',
      link: 'sms:01048212026'
    }
  ];

  form.addEventListener('submit', e => {
    e.preventDefault();

    const nick = document.getElementById('loveNick').value.trim();
    const contactType = document.querySelector('input[name="contactType"]:checked')?.value || 'insta';
    const contact = contactInput.value.trim();
    const targetGender = document.getElementById('loveTargetGender').value;

    if (!nick || !contact) {
      showToast('닉네임과 연락처를 모두 입력해주세요.');
      return;
    }

    // Matching Algorithm
    let matchedData;

    if (contactType === 'insta') {
      // If female target selected, choose Karina as requested
      if (targetGender === 'F') {
        matchedData = instaProfilesFemale[0]; // 카리나!
      } else {
        matchedData = instaProfilesMale[0];
      }
      matchedContactLabel.textContent = '상대방 인스타그램';
      connectBtnText.textContent = '인스타 DM으로 인사하기';
      btnConnect.href = matchedData.link;
    } else {
      // Phone Matching (전번끼리)
      matchedData = phoneProfiles[Math.floor(Math.random() * phoneProfiles.length)];
      matchedContactLabel.textContent = '상대방 전화번호';
      connectBtnText.textContent = '전화 / 문자 연락하기';
      btnConnect.href = matchedData.link;
    }

    matchedAvatar.textContent = matchedData.avatar;
    matchedName.textContent = matchedData.name;
    matchedDept.textContent = matchedData.dept;
    matchedIntro.textContent = matchedData.intro;
    matchedContactVal.textContent = matchedData.contact;

    matchedCard.classList.remove('hidden');
    triggerLoveConfetti();
    showToast(`💖 ${nick}님, 축제 1:1 매칭이 성사되었습니다!`);

    setTimeout(() => {
      matchedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 200);
  });

  if (btnRematch) {
    btnRematch.addEventListener('click', () => {
      showToast('💘 다른 인연을 매칭 중입니다...');
      matchedCard.classList.add('hidden');
      setTimeout(() => {
        form.dispatchEvent(new Event('submit'));
      }, 400);
    });
  }
}

function triggerLoveConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 40,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ff758f', '#ffccd5', '#c9184a']
    });
  }
}

/* ==========================================================================
   8. RSVP & Mobile Ticket
   ========================================================================== */
function initRSVPForm() {
  const form = document.getElementById('festRsvpForm');
  const ticketWrap = document.getElementById('issuedTicket');
  const tName = document.getElementById('tName');
  const tDay = document.getElementById('tDay');
  const tLuckyNum = document.getElementById('tLuckyNum');

  const savedData = localStorage.getItem('kmou_warm_rsvp');
  if (savedData) {
    try {
      const data = JSON.parse(savedData);
      renderTicketUI(data);
    } catch (e) {}
  }

  function renderTicketUI(data) {
    if (tName) tName.textContent = `${data.name} 님`;
    if (tDay) tDay.textContent = data.festDay;
    if (tLuckyNum) tLuckyNum.textContent = data.luckyCode;
    ticketWrap.classList.remove('hidden');
  }

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const name = document.getElementById('regName').value.trim();
      const phone = document.getElementById('regPhone').value.trim();
      const festDay = document.querySelector('input[name="festDay"]:checked')?.value || '양일 모두 참석';

      if (!name || !phone) {
        showToast('성함과 연락처를 입력해주세요.');
        return;
      }

      const lucky4 = Math.floor(1000 + Math.random() * 9000);
      const luckyCode = `KMOU-${lucky4}`;

      const rsvpObj = {
        name,
        phone,
        festDay,
        luckyCode,
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('kmou_warm_rsvp', JSON.stringify(rsvpObj));
      increaseSeatCount(1);
      renderTicketUI(rsvpObj);
      showToast('🎉 모바일 티켓 발급이 완료되었습니다!');
      triggerBigConfetti();

      setTimeout(() => {
        ticketWrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    });
  }
}

/* ==========================================================================
   9. General Share Button
   ========================================================================== */
function initShare() {
  const shareBtn = document.getElementById('shareLinkBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      if (navigator.share) {
        navigator
          .share({
            title: '2026 한국해양대학교 가을 대동제 초청장',
            text: '10월 28일~29일, 낭만의 바다 한국해양대 가을 대동제에 초대합니다! (1등 자동차/맥북 추첨 & 랜덤 소개팅)',
            url: window.location.href
          })
          .catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToast('🔗 초대장 링크가 복사되었습니다!');
        });
      }
    });
  }
}

function showToast(msg) {
  const toast = document.getElementById('toastBox');
  const text = document.getElementById('toastText');
  if (!toast || !text) return;

  text.textContent = msg;
  toast.classList.remove('hidden');

  if (window._toastTimer) clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
  }, 2600);
}

function triggerMiniConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#e76f51', '#f4a261', '#e9c46a']
    });
  }
}

function triggerBigConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e76f51', '#f4a261', '#e9c46a', '#9e2a2b']
    });
  }
}
