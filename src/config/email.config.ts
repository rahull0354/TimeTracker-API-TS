import nodemailer from "nodemailer";

/**
 * WorkLogix Ultra-Modern Email Templates
 * Aesthetic: Cyberpunk Glassmorphism with Floating 3D Elements
 * Features: Mesh gradients, levitating icons, glass cards, holographic effects
 */

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// ========== PASSWORD RESET EMAIL ==========
const passwordResetTemplate = (username: string, resetUrl: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Password | WorkLogix</title>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style type="text/css">
    body { margin: 0; padding: 0; background: #030305; }
    @keyframes levitate {
      0%, 100% { transform: translateY(0px) rotateX(0deg); }
      50% { transform: translateY(-8px) rotateX(2deg); }
    }
    @keyframes mesh-shift {
      0%, 100% { opacity: 0.6; transform: scale(1) rotate(0deg); }
      50% { opacity: 0.8; transform: scale(1.1) rotate(5deg); }
    }
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 30px rgba(236, 72, 153, 0.4), 0 0 60px rgba(124, 58, 237, 0.3); }
      50% { box-shadow: 0 0 50px rgba(236, 72, 153, 0.6), 0 0 100px rgba(124, 58, 237, 0.5); }
    }
    @keyframes float-particle {
      0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
      50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
    }
  </style>
</head>
<body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

  <!-- Main Container with Animated Mesh Gradient Background -->
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #030305; min-height: 100vh; position: relative;">

    <!-- Layered Mesh Gradient Background -->
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none;">
      <!-- Primary mesh gradient - purple/pink -->
      <div style="position: absolute; top: -10%; left: -5%; width: 60%; height: 60%; background: radial-gradient(ellipse at center, rgba(124, 58, 237, 0.35) 0%, transparent 70%); filter: blur(80px); animation: mesh-shift 8s ease-in-out infinite;"></div>
      <div style="position: absolute; bottom: -15%; right: -10%; width: 70%; height: 70%; background: radial-gradient(ellipse at center, rgba(236, 72, 153, 0.3) 0%, transparent 70%); filter: blur(90px); animation: mesh-shift 10s ease-in-out infinite 2s;"></div>
      <!-- Accent mesh - cyan/blue -->
      <div style="position: absolute; top: 40%; left: 30%; width: 40%; height: 40%; background: radial-gradient(ellipse at center, rgba(34, 211, 238, 0.15) 0%, transparent 70%); filter: blur(70px); animation: mesh-shift 12s ease-in-out infinite 4s;"></div>
    </div>

    <tr>
      <td style="padding: 100px 20px; vertical-align: middle; position: relative; z-index: 1;">

        <!-- Glass Card Container -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%" max-width="640" align="center" style="max-width: 640px; margin: 0 auto;">
          <tr>
            <td style="background: rgba(15, 15, 25, 0.75); backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px); border: 1px solid rgba(124, 58, 237, 0.2); border-radius: 48px; overflow: hidden; box-shadow: 0 50px 100px rgba(0, 0, 0, 0.7), 0 0 150px rgba(124, 58, 237, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05);">

              <!-- Holographic Top Border -->
              <div style="height: 8px; background: linear-gradient(90deg, transparent 0%, rgba(124, 58, 237, 0.6) 20%, rgba(236, 72, 153, 0.8) 50%, rgba(34, 211, 238, 0.6) 80%, transparent 100%); background-size: 200% 100%;"></div>

              <!-- Content Area -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding: 70px 60px; position: relative;">

                    <!-- Floating 3D Lock Icon with Depth -->
                    <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto 45px; position: relative;">
                      <tr>
                        <td style="position: relative; width: 140px; height: 140px;">

                          <!-- Floating Particles Around Lock -->
                          <div style="position: absolute; top: 5px; right: -5px; width: 6px; height: 6px; background: #ec4899; border-radius: 50%; box-shadow: 0 0 20px rgba(236, 72, 153, 1); animation: float-particle 3s ease-in-out infinite;"></div>
                          <div style="position: absolute; bottom: 10px; left: -8px; width: 5px; height: 5px; background: #22d3ee; border-radius: 50%; box-shadow: 0 0 18px rgba(34, 211, 238, 0.9); animation: float-particle 4s ease-in-out infinite 1s;"></div>
                          <div style="position: absolute; top: 50%; right: -12px; width: 4px; height: 4px; background: #7c3aed; border-radius: 50%; box-shadow: 0 0 15px rgba(124, 58, 237, 0.8); animation: float-particle 3.5s ease-in-out infinite 2s;"></div>
                          <div style="position: absolute; top: 20px; left: -10px; width: 5px; height: 5px; background: #ec4899; border-radius: 50%; box-shadow: 0 0 16px rgba(236, 72, 153, 0.85); animation: float-particle 4.5s ease-in-out infinite 0.5s;"></div>

                          <!-- Lock Base with 3D Effect -->
                          <div style="width: 100%; height: 100%; background: linear-gradient(145deg, #1a1a2e, #0a0a12); border-radius: 28px; box-shadow:
                            15px 15px 30px rgba(0, 0, 0, 0.7),
                            -8px -8px 20px rgba(255, 255, 255, 0.03),
                            inset 0 -3px 8px rgba(0, 0, 0, 0.4),
                            inset 0 3px 8px rgba(255, 255, 255, 0.04),
                            0 0 60px rgba(124, 58, 237, 0.2);
                            position: relative; display: flex; align-items: center; justify-content: center; animation: levitate 4s ease-in-out infinite;">

                            <!-- Lock Shackle -->
                            <div style="position: absolute; top: -35px; left: 50%; transform: translateX(-50%); width: 70px; height: 55px; border: 6px solid #ec4899; border-bottom: none; border-radius: 35px 35px 0 0; box-shadow:
                              0 -8px 20px rgba(236, 72, 153, 0.5),
                              inset 0 3px 6px rgba(255, 255, 255, 0.15),
                              0 0 40px rgba(236, 72, 153, 0.3);
                              background: linear-gradient(180deg, rgba(236, 72, 153, 0.1) 0%, transparent 100%);"></div>

                            <!-- Keyhole with Glow -->
                            <div style="width: 24px; height: 24px; background: linear-gradient(145deg, #7c3aed, #6d28d9); border-radius: 50%; box-shadow:
                              0 0 40px rgba(124, 58, 237, 1),
                              0 0 80px rgba(124, 58, 237, 0.6),
                              inset 0 3px 6px rgba(255, 255, 255, 0.2);
                              position: relative;"></div>

                            <!-- Keyhole Inner -->
                            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 10px; height: 10px; background: #0a0a12; border-radius: 50%; box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);"></div>
                          </div>

                          <!-- Floating Shadow Below Lock -->
                          <div style="position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%); width: 80px; height: 15px; background: radial-gradient(ellipse, rgba(124, 58, 237, 0.4) 0%, transparent 70%); filter: blur(8px); animation: levitate 4s ease-in-out infinite;"></div>

                        </td>
                      </tr>
                    </table>

                    <!-- Logo and Title -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="text-align: center; padding-bottom: 20px;">
                          <h1 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-size: 64px; font-weight: 800; letter-spacing: -4px; line-height: 1; background: linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #22d3ee 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; filter: drop-shadow(0 0 30px rgba(124, 58, 237, 0.5));">WorkLogix</h1>
                        </td>
                      </tr>
                      <tr>
                        <td style="text-align: center; padding-bottom: 50px;">
                          <p style="margin: 0; font-size: 11px; font-weight: 700; color: rgba(236, 72, 153, 0.7); letter-spacing: 5px; text-transform: uppercase; text-shadow: 0 0 20px rgba(236, 72, 153, 0.5);">Password Reset</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Main Message -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="padding-bottom: 50px;">
                          <p style="margin: 0; font-size: 19px; line-height: 1.8; color: rgba(255, 255, 255, 0.8); text-align: center; font-weight: 500;">
                            Hey <span style="color: #ec4899; font-weight: 700; text-shadow: 0 0 20px rgba(236, 72, 153, 0.5);">${username}</span>, time to reset your password
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Ultra 3D Glowing Button -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="text-align: center; padding-bottom: 60px;">
                          <table cellpadding="0" cellspacing="0" border="0" align="center">
                            <tr>
                              <td style="background: linear-gradient(145deg, #7c3aed, #6d28d9); border-radius: 24px; padding: 6px; box-shadow:
                                0 25px 50px rgba(124, 58, 237, 0.5),
                                0 0 100px rgba(236, 72, 153, 0.3),
                                inset 0 1px 0 rgba(255, 255, 255, 0.15);
                                animation: pulse-glow 3s ease-in-out infinite;">
                                <table cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td style="background: linear-gradient(145deg, #8b5cf6, #7c3aed); border-radius: 18px; padding: 26px 70px;">
                                      <a href="${resetUrl}" style="display: block; font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-weight: 700; color: #ffffff; text-decoration: none; letter-spacing: 1.5px; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">RESET PASSWORD →</a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Holographic Divider -->
                    <tr>
                      <td style="padding: 0 60px 50px;">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                          <tr>
                            <td style="width: 30%;"><div style="height: 2px; background: linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.6));"></div></td>
                            <td style="width: 40px; text-align: center;"><div style="width: 12px; height: 12px; background: linear-gradient(135deg, #ec4899, #22d3ee); border-radius: 50%; box-shadow: 0 0 25px rgba(236, 72, 153, 0.8), 0 0 50px rgba(34, 211, 238, 0.4);"></div></td>
                            <td style="width: 30%;"><div style="height: 2px; background: linear-gradient(90deg, rgba(124, 58, 237, 0.6), transparent);"></div></td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Backup Link in Glass Card -->
                    <tr>
                      <td style="padding: 0 60px 50px;">
                        <div style="background: rgba(124, 58, 237, 0.1); border: 1px solid rgba(124, 58, 237, 0.2); border-radius: 24px; padding: 30px; backdrop-filter: blur(10px); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);">
                          <p style="margin: 0 0 18px 0; font-size: 10px; font-weight: 800; color: rgba(124, 58, 237, 0.8); letter-spacing: 2.5px; text-transform: uppercase;">Backup Link</p>
                          <p style="margin: 0; font-size: 13px; font-family: 'Courier New', monospace; color: rgba(124, 58, 237, 0.95); word-break: break-all; line-height: 1.8;">${resetUrl}</p>
                        </div>
                      </td>
                    </tr>

                    <!-- Security Alert with Glow -->
                    <tr>
                      <td style="padding: 0 60px;">
                        <div style="background: rgba(251, 191, 36, 0.12); border-left: 5px solid #fbbf24; border-radius: 0 20px 20px 0; padding: 26px 32px; box-shadow: 0 15px 40px rgba(251, 191, 36, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05);">
                          <p style="margin: 0; font-size: 16px; line-height: 1.7; color: #fbbf24; font-weight: 600; text-shadow: 0 0 20px rgba(251, 191, 36, 0.3);">
                            ⏰ Expires in <span style="color: #f59e0b;">1 hour</span> • For your security
                          </p>
                        </div>
                      </td>
                    </tr>

                  </td>
                </tr>
              </table>

              <!-- Holographic Bottom Border -->
              <div style="height: 8px; background: linear-gradient(90deg, transparent 0%, rgba(34, 211, 238, 0.6) 20%, rgba(236, 72, 153, 0.8) 50%, rgba(124, 58, 237, 0.6) 80%, transparent 100%); background-size: 200% 100%;"></div>

            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%" max-width="640" align="center" style="max-width: 640px; margin: 50px auto 0;">
          <tr>
            <td style="text-align: center; padding: 25px;">
              <p style="margin: 0 0 15px 0; font-size: 14px; color: rgba(255, 255, 255, 0.4);">
                Didn't request this? Safe to ignore.
              </p>
              <p style="margin: 0; font-size: 13px; color: rgba(255, 255, 255, 0.3);">
                © 2025 WorkLogix • Crafted for the future
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;

// ========== PASSWORD RESET CONFIRMATION ==========
const passwordResetConfirmationTemplate = (username: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Updated | WorkLogix</title>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style type="text/css">
    body { margin: 0; padding: 0; background: #030305; }
    @keyframes levitate {
      0%, 100% { transform: translateY(0px) rotateX(0deg); }
      50% { transform: translateY(-8px) rotateX(2deg); }
    }
    @keyframes mesh-shift {
      0%, 100% { opacity: 0.6; transform: scale(1) rotate(0deg); }
      50% { opacity: 0.8; transform: scale(1.1) rotate(5deg); }
    }
    @keyframes pulse-glow-green {
      0%, 100% { box-shadow: 0 0 30px rgba(16, 185, 129, 0.4), 0 0 60px rgba(34, 211, 238, 0.3); }
      50% { box-shadow: 0 0 50px rgba(16, 185, 129, 0.6), 0 0 100px rgba(34, 211, 238, 0.5); }
    }
    @keyframes celebrate-pulse {
      0%, 100% { transform: scale(1); opacity: 0.5; }
      50% { transform: scale(1.15); opacity: 0.2; }
    }
  </style>
</head>
<body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #030305; min-height: 100vh; position: relative;">

    <!-- Green Mesh Gradient Background -->
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none;">
      <div style="position: absolute; top: -10%; left: -5%; width: 60%; height: 60%; background: radial-gradient(ellipse at center, rgba(16, 185, 129, 0.35) 0%, transparent 70%); filter: blur(80px); animation: mesh-shift 8s ease-in-out infinite;"></div>
      <div style="position: absolute; bottom: -15%; right: -10%; width: 70%; height: 70%; background: radial-gradient(ellipse at center, rgba(34, 211, 238, 0.3) 0%, transparent 70%); filter: blur(90px); animation: mesh-shift 10s ease-in-out infinite 2s;"></div>
    </div>

    <tr>
      <td style="padding: 80px 20px; vertical-align: middle; position: relative; z-index: 1;">

        <table cellpadding="0" cellspacing="0" border="0" width="100%" max-width="580" align="center" style="max-width: 580px; margin: 0 auto;">
          <tr>
            <td style="background: rgba(15, 15, 25, 0.75); backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 36px; overflow: hidden; box-shadow: 0 50px 100px rgba(0, 0, 0, 0.7), 0 0 150px rgba(16, 185, 129, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05);">

              <!-- Green Holographic Border -->
              <div style="height: 6px; background: linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.6) 20%, rgba(34, 211, 238, 0.8) 50%, rgba(5, 150, 105, 0.6) 80%, transparent 100%); background-size: 200% 100%;"></div>

              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="padding: 45px 50px 40px; position: relative;">

                    <!-- Success Icon with Pulsing Rings -->
                    <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto 30px; position: relative;">
                      <tr>
                        <td style="position: relative; width: 100px; height: 100px;">
                          <!-- Success Checkmark Circle -->
                          <div style="width: 100%; height: 100%; background: linear-gradient(145deg, #1a1a2e, #0a0a12); border-radius: 50%; box-shadow:
                            12px 12px 24px rgba(0, 0, 0, 0.7),
                            -6px -6px 12px rgba(255, 255, 255, 0.03),
                            inset 0 -2px 6px rgba(0, 0, 0, 0.4),
                            inset 0 2px 6px rgba(255, 255, 255, 0.04),
                            0 0 50px rgba(16, 185, 129, 0.2);
                            display: flex; align-items: center; justify-content: center; animation: levitate 4s ease-in-out infinite; position: relative;">
                            <div style="font-size: 52px; color: #10b981; text-shadow: 0 0 40px rgba(16, 185, 129, 1), 0 0 80px rgba(16, 185, 129, 0.6);">✓</div>
                          </div>
                          <!-- Pulsing Rings -->
                          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 120px; height: 120px; border: 2px solid rgba(16, 185, 129, 0.3); border-radius: 50%; animation: celebrate-pulse 2s ease-in-out infinite;"></div>
                          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 145px; height: 145px; border: 1px solid rgba(34, 211, 238, 0.2); border-radius: 50%; animation: celebrate-pulse 2s ease-in-out infinite 0.5s;"></div>
                        </td>
                      </tr>
                    </table>

                    <!-- Logo -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="text-align: center; padding-bottom: 12px;">
                          <h1 style="margin: 0; font-family: 'Space Grotesk', sans-serif; font-size: 52px; font-weight: 800; letter-spacing: -3px; line-height: 1; color: #10b981; filter: drop-shadow(0 0 30px rgba(16, 185, 129, 0.5));">WorkLogix</h1>
                        </td>
                      </tr>
                      <tr>
                        <td style="text-align: center; padding-bottom: 35px;">
                          <p style="margin: 0; font-size: 10px; font-weight: 700; color: rgba(16, 185, 129, 0.7); letter-spacing: 4px; text-transform: uppercase; text-shadow: 0 0 20px rgba(16, 185, 129, 0.5);">Password Updated</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Compact Success Message -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="padding-bottom: 35px;">
                          <p style="margin: 0; font-size: 17px; line-height: 1.6; color: rgba(255, 255, 255, 0.8); text-align: center; font-weight: 500;">
                            All set, <span style="color: #10b981; font-weight: 700; text-shadow: 0 0 20px rgba(16, 185, 129, 0.5);">${username}</span>!
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- 3D Green Button -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="text-align: center; padding-bottom: 35px;">
                          <table cellpadding="0" cellspacing="0" border="0" align="center">
                            <tr>
                              <td style="background: linear-gradient(145deg, #10b981, #059669); border-radius: 20px; padding: 5px; box-shadow:
                                0 20px 40px rgba(16, 185, 129, 0.5),
                                0 0 80px rgba(34, 211, 238, 0.3),
                                inset 0 1px 0 rgba(255, 255, 255, 0.15);
                                animation: pulse-glow-green 3s ease-in-out infinite;">
                                <table cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td style="background: linear-gradient(145deg, #34d399, #10b981); border-radius: 15px; padding: 20px 55px;">
                                      <a href="${process.env.FRONTEND_URL}/login" style="display: block; font-family: 'Space Grotesk', sans-serif; font-size: 16px; font-weight: 700; color: #ffffff; text-decoration: none; letter-spacing: 1.2px; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">GO TO LOGIN →</a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Compact Divider -->
                    <tr>
                      <td style="padding: 0 50px 30px;">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                          <tr>
                            <td style="width: 35%;"><div style="height: 1px; background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.5));"></div></td>
                            <td style="width: 30px; text-align: center;"><div style="width: 8px; height: 8px; background: linear-gradient(135deg, #10b981, #22d3ee); border-radius: 50%; box-shadow: 0 0 20px rgba(16, 185, 129, 0.8);"></div></td>
                            <td style="width: 35%;"><div style="height: 1px; background: linear-gradient(90deg, rgba(16, 185, 129, 0.5), transparent);"></div></td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Security Notice -->
                    <tr>
                      <td style="padding: 0 50px;">
                        <div style="background: rgba(251, 191, 36, 0.1); border-left: 4px solid #fbbf24; border-radius: 0 16px 16px 0; padding: 18px 24px; box-shadow: 0 10px 30px rgba(251, 191, 36, 0.12);">
                          <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #fbbf24; font-weight: 600;">
                            🔒 Didn't make this change? <a href="mailto:support@worklogix.com" style="color: #10b981;">Contact support</a>
                          </p>
                        </div>
                      </td>
                    </tr>

                  </td>
                </tr>
              </table>

              <!-- Bottom Green Border -->
              <div style="height: 6px; background: linear-gradient(90deg, transparent 0%, rgba(5, 150, 105, 0.6) 20%, rgba(34, 211, 238, 0.8) 50%, rgba(16, 185, 129, 0.6) 80%, transparent 100%); background-size: 200% 100%;"></div>

            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table cellpadding="0" cellspacing="0" border="0" width="100%" max-width="580" align="center" style="max-width: 580px; margin: 35px auto 0;">
          <tr>
            <td style="text-align: center; padding: 20px;">
              <p style="margin: 0; font-size: 12px; color: rgba(255, 255, 255, 0.3);">
                © 2025 WorkLogix • Crafted for the future
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;

// ========== EXPORT FUNCTIONS ==========

export const sendPasswordResetEmail = async (
  email: string,
  resetToken: string,
  username: string,
): Promise<void> => {
  const transporter = createTransporter();
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "⚡ Reset Your Password | WorkLogix",
    html: passwordResetTemplate(username, resetUrl),
    text: `
Reset Your Password | WorkLogix

Hey ${username}, time to reset your password

Click the link below to continue:
${resetUrl}

⏰ This link expires in 1 hour.

Didn't request this? Safe to ignore.

© 2025 WorkLogix • Crafted for the future
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendPasswordResetConfirmationEmail = async (
  email: string,
  username: string,
): Promise<void> => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "🎉 Password Updated | WorkLogix",
    html: passwordResetConfirmationTemplate(username),
    text: `
Password Updated | WorkLogix

You're all set, ${username}!

Your password has been successfully updated.

Login: ${process.env.FRONTEND_URL}/login

🔒 Security: Didn't make this change? Contact support immediately.

© 2025 WorkLogix • Crafted for the future
    `,
  };

  await transporter.sendMail(mailOptions);
};
