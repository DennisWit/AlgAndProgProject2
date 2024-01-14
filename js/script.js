function submitForm() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const colorRadios = document.getElementsByName('color');
    let selectedColor;

    // Находим выбранный цвет
    for (const radio of colorRadios) {
      if (radio.checked) {
        selectedColor = radio.value;
        break;
      }
    }

    if (!selectedColor) {
      alert('Пожалуйста, выберите цвет.');
      return;
    }

    // Отправляем данные
    fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        phone,
        color: selectedColor,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Данные успешно отправлены!');
      } else {
        alert('Ошибка при отправке данных. Пожалуйста, попробуйте еще раз.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Произошла ошибка. Пожалуйста, повторите попытку позже.');
    });
  }