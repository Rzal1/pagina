let selectedAvatar = null;

        function selectAvatar(avatarId) {
            // Remover la clase "selected" de todos los avatares
            document.getElementById('avatar1').classList.remove('selected');
            document.getElementById('avatar2').classList.remove('selected');
            
            // Añadir la clase "selected" al avatar seleccionado
            selectedAvatar = avatarId;
            document.getElementById(avatarId).classList.add('selected');
        }

        function confirmSelection() {
            if (selectedAvatar) {
                alert('Has seleccionado ' + selectedAvatar);
            } else {
                alert('Por favor, selecciona un avatar antes de confirmar.');
            }
        }