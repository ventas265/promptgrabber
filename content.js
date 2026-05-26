document.addEventListener('mouseover', function(e) {
  const img = e.target.closest('img');
  if (!img) return;

  let promptText = img.alt || img.title || img.getAttribute('data-prompt') || img.getAttribute('aria-label');

  if (!promptText) {
    const container = img.closest('div, figure, a');
    if (container) {
      promptText = Array.from(container.querySelectorAll('*')).find(el => 
        el.textContent && /prompt|midjourney|flux|dall|leonardo|stable diffusion/i.test(el.textContent)
      )?.textContent.trim();
    }
  }

  if (promptText && promptText.length > 15) {
    showTooltip(img, promptText);

    img.style.cursor = 'pointer';
    img.addEventListener('dblclick', function copyPrompt(e) {
      e.preventDefault();
      navigator.clipboard.writeText(promptText).then(() => {
        showCopiedFeedback(img);
      });
    }, { once: true });
  }
});

function showTooltip(img, text) {
  let tooltip = document.createElement('div');
  tooltip.style.position = 'fixed';
  tooltip.style.background = '#1f2937';
  tooltip.style.color = '#fff';
  tooltip.style.padding = '10px 14px';
  tooltip.style.borderRadius = '8px';
  tooltip.style.fontSize = '14px';
  tooltip.style.zIndex = '2147483647';
  tooltip.style.maxWidth = '300px';
  tooltip.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
  tooltip.textContent = '📋 Prompt detectado - Doble clic para copiar';
  document.body.appendChild(tooltip);

  const rect = img.getBoundingClientRect();
  tooltip.style.left = rect.left + 'px';
  tooltip.style.top = rect.bottom + 10 + 'px';

  setTimeout(() => tooltip.remove(), 2500);
}

function showCopiedFeedback(img) {
  const feedback = document.createElement('div');
  feedback.textContent = '✅ ¡Prompt copiado al portapapeles!';
  feedback.style.position = 'fixed';
  feedback.style.background = '#10b981';
  feedback.style.color = '#fff';
  feedback.style.padding = '8px 16px';
  feedback.style.borderRadius = '6px';
  feedback.style.zIndex = '2147483647';
  const rect = img.getBoundingClientRect();
  feedback.style.left = rect.left + 'px';
  feedback.style.top = rect.top - 50 + 'px';
  document.body.appendChild(feedback);
  setTimeout(() => feedback.remove(), 1800);
}