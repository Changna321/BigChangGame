document.addEventListener('DOMContentLoaded', () => {
    displayNames();
});

function submitName() {
    const nameInput = document.getElementById('nameInput');
    const output = document.getElementById('output');
    const name = nameInput.value.trim();

    if (!name) {
        showToast('Vui lòng nhập tên!', 'error');
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
        showToast('Tên chỉ được chứa chữ cái và khoảng trắng!', 'error');
        return;
    }

    let names = JSON.parse(localStorage.getItem('userNames')) || [];
    if (!names.includes(name)) {
        names.push(name);
        localStorage.setItem('userNames', JSON.stringify(names));
    }
    output.innerText = `Xin chào, ${name}!`;
    showToast('Tên đã được lưu!', 'success');
    nameInput.value = '';
    displayNames();
}

function clearAllNames() {
    localStorage.removeItem('userNames');
    document.getElementById('output').innerText = '';
    document.getElementById('nameInput').value = '';
    document.getElementById('nameList').innerHTML = '';
    showToast('Đã xóa tất cả tên!', 'success');
}

function deleteName(index) {
    let names = JSON.parse(localStorage.getItem('userNames')) || [];
    names.splice(index, 1);
    localStorage.setItem('userNames', JSON.stringify(names));
    displayNames();
    showToast('Đã xóa tên!', 'success');
}

function displayNames() {
    const nameList = document.getElementById('nameList');
    const names = JSON.parse(localStorage.getItem('userNames')) || [];
    nameList.innerHTML = '';

    if (names.length > 0) {
        const ul = document.createElement('ul');
        names.forEach((name, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${name} <button onclick="deleteName(${index})">Xóa</button>`;
            ul.appendChild(li);
        });
        nameList.appendChild(ul);
    }
}

function showToast(message, type) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}
