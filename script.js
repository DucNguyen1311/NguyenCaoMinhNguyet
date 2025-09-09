document.addEventListener('DOMContentLoaded', function () {
  // Collapsible
  const collapsibleBtn = document.querySelector('.collapsible');
  const content = document.querySelector('.content');
  collapsibleBtn.addEventListener('click', function () {
    content.classList.toggle('show');
    collapsibleBtn.textContent =
      (content.classList.contains('show') ? '▼ ' : '► ') + 'Dùng khi wibu bị đe dọa';
  });

  // Copy button
  document.querySelector('.copy-btn').addEventListener('click', function () {
    const text = content.querySelector('p').textContent;
    navigator.clipboard.writeText(text);
    this.textContent = 'Đã copy!';
    setTimeout(() => (this.textContent = 'Nhấn để copy'), 1200);
  });

  // Tabs menu UI (not functional in this demo)
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      // Implement tab switching content here if you add more tabbed content
    });
  });
});
