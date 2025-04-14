document.addEventListener('DOMContentLoaded', function() {
  // Ensure page starts at the top
  window.scrollTo(0, 0);
  
  const batteryLevel = document.querySelector('.battery-level');
  const energyLevelText = document.querySelector('.energy-level');
  const rechargeBtn = document.getElementById('recharge-btn');
  const encouragementBox = document.getElementById('encouragement');
  const heartsContainer = document.getElementById('hearts-container');
  
  let chargeLevel = 0;
  let usedMessageIndices = []; // Track which messages have been used
  
  // Encouraging messages that will appear randomly - expanded collection
  const encouragements = [
      "You're doing amazing! Keep going! 💪",
      "Your smile lights up my day! 😊",
      "Taking breaks is part of being productive! 🌸",
      "You bring joy to everyone around you! ✨",
      "You've got this! I know you can do it! 🌟",
      "Every day seeing you texting me is a bright day! 🌈",
      "You deserve all the happiness in the world! 💕",
      "Your energy is contagious! ⚡",
      "Never forget how incredible you are! 💫",
      "You make the world a better place just by being you! 💖",
  ];
  
  // Function to update the battery level
  function updateBatteryLevel() {
      batteryLevel.style.height = `${chargeLevel}%`;
      energyLevelText.textContent = `${chargeLevel}%`;
      
      // Change the color based on charge level - adjusted for dark mode
      if (chargeLevel < 20) {
          batteryLevel.style.background = 'linear-gradient(to top, #ff5252, #ff1744)';
          energyLevelText.style.color = '#ff1744';
      } else if (chargeLevel < 50) {
          batteryLevel.style.background = 'linear-gradient(to top, #ffff00, #ffea00)';
          energyLevelText.style.color = '#ffea00';
      } else {
          batteryLevel.style.background = 'linear-gradient(to top, #69f0ae, #00e676)';
          energyLevelText.style.color = '#00e676';
      }
      
      // Display a special message when fully charged and transform UI
      if (chargeLevel >= 100) {
          encouragementBox.innerHTML = "<em>You're fully charged! 🌟</em>";
          createConfetti();
          createFireworks();
          
          // Change the recharge button to a "Done!" button
          rechargeBtn.textContent = "Done!";
          rechargeBtn.classList.add("done-button");
          
          // Change the button functionality
          rechargeBtn.removeEventListener('click', rechargeButtonHandler);
          rechargeBtn.addEventListener('click', showNextCard);
      }
  }
  
  // Function to get a unique encouragement message
  function getUniqueEncouragement() {
      // If we've used all messages, reset the tracking
      if (usedMessageIndices.length >= encouragements.length - 1) {
          usedMessageIndices = [];
      }
      
      // Find an unused message index
      let availableIndices = [];
      for (let i = 0; i < encouragements.length; i++) {
          if (!usedMessageIndices.includes(i)) {
              availableIndices.push(i);
          }
      }
      
      // Select a random unused message
      const randomIndex = Math.floor(Math.random() * availableIndices.length);
      const messageIndex = availableIndices[randomIndex];
      
      // Track that we've used this message
      usedMessageIndices.push(messageIndex);
      
      return encouragements[messageIndex];
  }
  
  // Store the original recharge button handler function
  function rechargeButtonHandler() {
      // Increment charge level but don't exceed 100%
      chargeLevel = Math.min(chargeLevel + 10, 100);
      updateBatteryLevel();
      
      // Update encouragement message with a unique one (only on button click)
      if (chargeLevel < 100) {
          encouragementBox.innerHTML = `<em>${getUniqueEncouragement()}</em>`;
          
          // Add a subtle animation effect
          encouragementBox.classList.add('message-change');
          setTimeout(() => {
              encouragementBox.classList.remove('message-change');
          }, 500);
      }
      
      // Create floating hearts
      createHearts();
      
      // Add button animation
      this.classList.add('clicked');
      setTimeout(() => this.classList.remove('clicked'), 300);
  }
  
  // Recharge button click handler - use the named function instead of anonymous
  rechargeBtn.addEventListener('click', rechargeButtonHandler);
  
  // Create floating hearts animation
  function createHearts() {
      for (let i = 0; i < 10; i++) {
          setTimeout(() => {
              const heart = document.createElement('div');
              heart.classList.add('heart');
              heart.innerHTML = '❤️';
              heart.style.left = `${Math.random() * 100}%`;
              heart.style.top = `${80 + Math.random() * 20}%`;
              heart.style.animationDuration = `${3 + Math.random() * 2}s`;
              heartsContainer.appendChild(heart);
              
              setTimeout(() => {
                  heartsContainer.removeChild(heart);
              }, 5000);
          }, i * 100);
      }
  }
  
  // Create confetti when fully charged
  function createConfetti() {
      for (let i = 0; i < 50; i++) {
          setTimeout(() => {
              const confetti = document.createElement('div');
              confetti.classList.add('heart');
              confetti.innerHTML = ['🎉', '✨', '💖', '🌟', '💕', ''][Math.floor(Math.random() * 5)];
              confetti.style.left = `${Math.random() * 100}%`;
              confetti.style.top = `${Math.random() * 100}%`;
              confetti.style.animationDuration = `${3 + Math.random() * 3}s`;
              heartsContainer.appendChild(confetti);
              
              setTimeout(() => {
                  heartsContainer.removeChild(confetti);
              }, 6000);
          }, i * 100);
      }
  }
  
  // Create fireworks animation around the battery
  function createFireworks() {
      const fireworksContainer = document.createElement('div');
      fireworksContainer.classList.add('fireworks-container');
      document.querySelector('.battery-container').appendChild(fireworksContainer);
      
      // Create multiple firework bursts
      for (let i = 0; i < 15; i++) {
          setTimeout(() => {
              const firework = document.createElement('div');
              firework.classList.add('firework');
              
              // Position fireworks randomly around the battery
              const angle = Math.random() * Math.PI * 2;
              const distance = 70 + Math.random() * 50;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              
              firework.style.left = `calc(50% + ${x}px)`;
              firework.style.top = `calc(50% + ${y}px)`;
              
              // Random colors for the fireworks
              const hue = Math.floor(Math.random() * 360);
              firework.style.backgroundColor = `hsl(${hue}, 100%, 70%)`;
              firework.style.boxShadow = `0 0 6px 3px hsl(${hue}, 100%, 70%)`;
              
              // Random size
              const size = 4 + Math.random() * 6;
              firework.style.width = `${size}px`;
              firework.style.height = `${size}px`;
              
              // Random animation duration
              firework.style.animationDuration = `${0.5 + Math.random() * 0.5}s`;
              
              fireworksContainer.appendChild(firework);
              
              // Remove the firework after animation
              setTimeout(() => {
                  fireworksContainer.removeChild(firework);
              }, 1000);
          }, i * 200);
      }
  }
  
  // Function to show the next card with reminder
  function showNextCard() {
      // Create the next card
      const currentContainer = document.querySelector('.container');
      const footer = document.querySelector('footer');
      const nextCard = document.createElement('div');
      nextCard.classList.add('container', 'next-card');
      
      nextCard.innerHTML = `
          <h1>Remember to Take Breaks!</h1>
          <div class="gif-container">
              <img src="images/recharge.gif" alt="Recharging animation" class="recharge-gif">
          </div>
          <div class="reminder-message">
              <p><em>Taking time to recharge is very important! Come back whenever you need a boost!</em></p>
          </div>
          <button id="restart-btn">Recharge ⚡</button>
      `;
      
      // Add the new card to the page in the same position as the first
      currentContainer.parentNode.insertBefore(nextCard, currentContainer.nextSibling);
      
      // Temporarily move footer below
      document.body.appendChild(footer);
      
      // Animate the transition
      setTimeout(() => {
          // Hide the first container
          currentContainer.style.display = 'none';
          
          // Show the next card with animation
          nextCard.classList.add('slide-in');
          
          // Ensure footer is visible below the card
          footer.style.position = 'relative';
          footer.style.marginTop = '30px';
          
          // Scroll to top
          window.scrollTo({
              top: 0,
              behavior: 'smooth'
          });
      }, 50);
      
      // Add event listener to restart button
      setTimeout(() => {
          const restartBtn = document.getElementById('restart-btn');
          restartBtn.addEventListener('click', () => {
              window.location.reload();
          });
      }, 500);
  }
  
  // Initialize the battery level
  updateBatteryLevel();
});

// For browsers that might scroll before DOM is fully loaded
window.onbeforeunload = function() {
  window.scrollTo(0, 0);
};