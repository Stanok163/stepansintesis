const _supabaseUrl = 'https://grtxbqsnjbvqpykpqlrl.supabase.co';
const _supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdydHhicXNuamJ2cXB5a3BxbHJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MDA4NzIsImV4cCI6MjA5Mzk3Njg3Mn0.Lzb8GPDB4uP3owZu93LWKlh1GDRtMKKlfg54gGKIRL0';
const supabase = supabase.createClient(_supabaseUrl, _supabaseKey);

async function updateAuthUI() {
    const statusDiv = document.getElementById('user-status');
    if (!statusDiv) return;

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        statusDiv.innerHTML = `
            <span>Conectado: <strong>${user.email}</strong></span>
            <button onclick="logout()" style="margin-left:10px; background:none; border:1px solid white; color:white; cursor:pointer; padding:2px 5px;">Salir</button>
        `;
    } else {
        statusDiv.innerHTML = '<a href="login.html" style="color:white; text-decoration:none;">Acceso Staff</a>';
    }
}

async function checkStatus() {
    const statusDiv = document.getElementById('user-status');
    if (!statusDiv) return;

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        statusDiv.innerHTML = `
            <span style="font-size: 0.8rem; opacity: 0.8;">Usuario:</span><br>
            <strong style="font-size: 1rem;">${user.email}</strong><br>
            <a href="#" onclick="logout()" style="color: #00d1ff; font-size: 0.8rem;">Cerrar Sesión</a>
        `;
    }
}

async function logout() {
    await supabase.auth.signOut();
    window.location.reload();
}

document.addEventListener('DOMContentLoaded', checkStatus);