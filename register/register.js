import { participantTemplate, successTemplate } from './Templates.js';

document.addEventListener('DOMContentLoaded', () => {
  let participantCount = 1;

  const addParticipantButton = document.getElementById('add');

  addParticipantButton.addEventListener('click', () => {
      participantCount++;
      const newParticipant = participantTemplate(participantCount);
      addParticipantButton.insertAdjacentHTML('beforebegin', newParticipant);
  });

  document.getElementById('form').addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent the default form submission
      console.log('Form submit intercepted');
      
      const total = totalFees();
      const name = document.getElementById('adult_name').value;
      const message = successTemplate({ name, count: participantCount, total });

      document.getElementById('form').style.display = 'none';
      document.getElementById('summary').innerHTML = message;
      document.getElementById('summary').style.display = 'block';
  });
});

function totalFees() {
  let feeElements = [...document.querySelectorAll("[id^=fee]")];
  return feeElements.reduce((total, feeElement) => total + parseFloat(feeElement.value || 0), 0);
}
