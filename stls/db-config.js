const _supabaseUrl = 'https://grtxbqsnjbvqpykpqlrl.supabase.co';
const _supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdydHhicXNuamJ2cXB5a3BxbHJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MDA4NzIsImV4cCI6MjA5Mzk3Njg3Mn0.Lzb8GPDB4uP3owZu93LWKlh1GDRtMKKlfg54gGKIRL0';

const supabaseClient = supabase.createClient(_supabaseUrl, _supabaseKey);

async function checkStatus() {
    const statusDiv = document.getElementById('user-status');
    const navButtons = document.getElementById('nav-buttons');

    const { data: { user } } = await supabaseClient.auth.getUser();

    if (user) {

        if (statusDiv) {
            statusDiv.innerHTML = `
                <span style="opacity: 0.8;">Usuario:</span> <strong style="color: #00d1ff;">${user.email}</strong> 
                <a href="#" onclick="logout()" style="color: white; margin-left: 10px; font-size: 0.8rem; text-decoration: underline;">[Salir]</a>
            `;
        }
        
        if (navButtons && !document.getElementById('staff-btn')) {
            const staffBtn = document.createElement('a');
            staffBtn.href = 'staff.html';
            staffBtn.className = 'btn';
            staffBtn.id = 'staff-btn';
            staffBtn.style.backgroundColor = '#28a745';
            staffBtn.innerText = 'Рабочая зона';
            navButtons.appendChild(staffBtn);
        }
    } else {

        if (statusDiv) {
            statusDiv.innerHTML = '<a href="login.html" style="color:white; text-decoration:none;">Acceso Staff</a>';
        }
    }
}

async function logout() {
    await supabaseClient.auth.signOut();
    window.location.reload();
}

document.addEventListener('DOMContentLoaded', checkStatus);