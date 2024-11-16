let totalPrice = 0;

function addItem(button) {
  
  let item = button.closest('.item');
  
  let name = item.querySelector('.name').innerText;
  let priceText = item.querySelector('.price').innerText;
  let price = parseFloat(priceText.replace('$', ''));  
 


  document.getElementById("products").innerHTML += `
  <tr><td>${name}</td>
  <td>${price}</td>
  <td>
  <button class="btn btn-danger" onclick="deleteUser(this)">Clear</button>
  </td>
  </tr>`;
  
 
  totalPrice += price;
  document.getElementById("totalPrice").innerText = totalPrice;
}
function deleteUser(button) {
  let row = button.closest('tr');
  let price = parseFloat(row.cells[1].innerText);
  totalPrice -= price;
  document.getElementById("totalPrice").innerText = totalPrice;
  row.remove();
}