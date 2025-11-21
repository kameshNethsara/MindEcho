import {} from 'react';

const petals = [
  // Pink petals
  { type: 'petal', color: 'rgba(255, 182, 193, 0.6)', size: 20, delay: 0, duration: 25, left: 5, drift: 15 },
  { type: 'petal', color: 'rgba(255, 192, 203, 0.5)', size: 15, delay: 3, duration: 30, left: 15, drift: -20 },
  { type: 'petal', color: 'rgba(255, 182, 193, 0.7)', size: 18, delay: 7, duration: 28, left: 25, drift: 10 },
  { type: 'petal', color: 'rgba(255, 192, 203, 0.4)', size: 22, delay: 2, duration: 32, left: 35, drift: -15 },
  
  // Green leaves
  { type: 'leaf', color: 'rgba(144, 238, 144, 0.6)', size: 25, delay: 1, duration: 27, left: 45, drift: 20 },
  { type: 'leaf', color: 'rgba(152, 251, 152, 0.5)', size: 18, delay: 5, duration: 29, left: 55, drift: -18 },
  { type: 'leaf', color: 'rgba(144, 238, 144, 0.7)', size: 20, delay: 8, duration: 26, left: 65, drift: 12 },
  { type: 'leaf', color: 'rgba(152, 251, 152, 0.4)', size: 23, delay: 4, duration: 31, left: 75, drift: -22 },
  
  // Yellow petals
  { type: 'petal', color: 'rgba(255, 255, 153, 0.6)', size: 17, delay: 6, duration: 28, left: 85, drift: 18 },
  { type: 'petal', color: 'rgba(255, 250, 205, 0.5)', size: 19, delay: 9, duration: 30, left: 95, drift: -16 },
  { type: 'petal', color: 'rgba(255, 255, 153, 0.7)', size: 21, delay: 1.5, duration: 27, left: 10, drift: 14 },
  
  // Additional pink petals
  { type: 'petal', color: 'rgba(255, 182, 193, 0.5)', size: 16, delay: 10, duration: 33, left: 20, drift: -12 },
  { type: 'petal', color: 'rgba(255, 192, 203, 0.6)', size: 24, delay: 4.5, duration: 29, left: 40, drift: 16 },
  
  // Additional green leaves
  { type: 'leaf', color: 'rgba(144, 238, 144, 0.5)', size: 22, delay: 7.5, duration: 28, left: 50, drift: -14 },
  { type: 'leaf', color: 'rgba(152, 251, 152, 0.6)', size: 19, delay: 2.5, duration: 31, left: 70, drift: 19 },
  
  // Additional yellow petals
  { type: 'petal', color: 'rgba(255, 255, 153, 0.5)', size: 20, delay: 6.5, duration: 26, left: 30, drift: -17 },
  { type: 'petal', color: 'rgba(255, 250, 205, 0.7)', size: 18, delay: 9.5, duration: 32, left: 60, drift: 13 },
  { type: 'petal', color: 'rgba(255, 255, 153, 0.4)', size: 23, delay: 3.5, duration: 29, left: 80, drift: -19 },
  
  // Soft pastel additions
  { type: 'petal', color: 'rgba(255, 228, 225, 0.6)', size: 21, delay: 5.5, duration: 27, left: 90, drift: 11 },
  { type: 'leaf', color: 'rgba(173, 255, 173, 0.5)', size: 17, delay: 8.5, duration: 30, left: 8, drift: -13 },
];

export default function MindEchoBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100"></div>
      
      {/* Floating Petals and Leaves */}
      {petals.map((item, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${item.size}px`,
            height: `${item.size}px`,
            backgroundColor: item.color,
            left: `${item.left}%`,
            bottom: '-50px',
            animation: `float${i} ${item.duration}s ease-in-out ${item.delay}s infinite`,
            boxShadow: item.type === 'petal' 
              ? '0 2px 8px rgba(0,0,0,0.1)' 
              : '0 2px 6px rgba(0,0,0,0.08)',
          }}
        >
          {item.type === 'leaf' && (
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${item.color} 0%, rgba(144, 238, 144, 0.3) 100%)`,
              }}
            />
          )}
        </div>
      ))}

      <style>{`
        ${petals.map((item, i) => `
          @keyframes float${i} {
            0% { 
              transform: translateY(0) translateX(0) rotate(0deg); 
              opacity: 0;
            }
            10% {
              opacity: ${0.4 + Math.random() * 0.3};
            }
            50% { 
              transform: translateY(-50vh) translateX(${item.drift}vw) rotate(180deg); 
              opacity: ${0.5 + Math.random() * 0.3};
            }
            90% {
              opacity: ${0.3 + Math.random() * 0.2};
            }
            100% { 
              transform: translateY(-110vh) translateX(${item.drift * 1.5}vw) rotate(360deg); 
              opacity: 0;
            }
          }
        `).join('\n')}
      `}</style>
    </div>
  );
}