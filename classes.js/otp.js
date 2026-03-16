// OTP Countdown Simulator


  console.log("OTP Sent Successfully");

  let countdown = 10;

  const timer = setInterval(() => {
    console.log(`Resend available in ${countdown} seconds`);
    countdown--;

    if (countdown < 0) {
      clearInterval(timer);
      console.log("You can now resend the OTP.");
    }
  }, 1000);


