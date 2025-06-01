document.addEventListener('DOMContentLoaded', () => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
        document.getElementById('output').innerText = `Xin chào, ${savedName}!`;
    }
});

function submitName() {
    const nameInput = document.getElementById('nameInput');
    const output = document.getElementById('output');
    const toast = document.getElementById('toast');
    const name = nameInput.value.trim();

    if (!name) {
        showToast('Vui lòng nhập tên!', 'error');
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
        showToast('Tên chỉ được chứa chữ cái và khoảng trắng!', 'error');
        return;
    }

    localStorage.setItem('userName', name);
    output.innerText = `Xin chào, ${name}!`;
    showToast('Tên đã được lưu!', 'success');
    nameInput.value = '';
}

function clearName() {
    localStorage.removeItem('userName');
    document.getElementById('output').innerText = '';
    document.getElementById('nameInput').value = '';
    showToast('Đã xóa tên!', 'success');
}

function showToast(message, type) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}
