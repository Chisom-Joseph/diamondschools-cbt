function showFullscreenAlert({ title, message, button, type = "success" }) {
  let icon = `<i class="bi bi-info-circle"></i>`;
  if (type === "error") {
    icon = `<i class="bi bi-exclamation-circle"></i>`;
  } else if (type === "success") {
    icon = `<i class="bi bi-check-circle"></i>`;
  } else if (type === "warning") {
    icon = `<i class="bi bi-exclamation-triangle"></i>`;
  }

  // Check if an existing alert container is already present
  if (document.getElementById("fullscreen-alert-container")) {
    document.getElementById("fullscreen-alert-container").remove();
  }

  // Create the full-screen alert container
  const alertContainer = document.createElement("div");
  alertContainer.id = "fullscreen-alert-container";
  alertContainer.className =
    "fixed inset-0 flex items-center justify-center z-50";
  document.body.appendChild(alertContainer);

  // Create the overlay for the alert
  const alertOverlay = document.createElement("div");
  alertOverlay.className = `absolute inset-0 flex items-center justify-center ${
    type === "success" ? "bg-black/90" : "bg-black/90"
  }`;

  // Event listener to close alert when clicking outside the alert box
  alertOverlay.addEventListener("click", (event) => {
    if (event.target === alertOverlay) {
      alertContainer.remove();
    }
  });

  // Create the alert box
  const alertBox = document.createElement("div");
  alertBox.className =
    "dark:text-white text-gray-700 p-6 border border-gray-300 rounded-lg bg-gray-50 border-gray-600 dark:border-gray-600 dark:bg-gray-800 max-w-2xl mx-5";
  alertBox.innerHTML = `
    <h3 class="flex items-center justify-start gap-2 text-3xl font-medium">
    ${icon}
    <span>${title}</span>
    </h3>
    <p class="mt-4 mb-2">${message}</p>
    <div>
        <button onclick="document.getElementById('fullscreen-alert-container').remove()" class="border-2 border-gray-800 mt-4 px-4 py-2 dark:bg-gray-700 bg-gray-800 text-white rounded dark:hover:bg-gray-900 hover:bg-gray-700">
        Dismiss
        </button>
        ${button}
    </div>
  `;

  // Append alert box to overlay, and overlay to alert container
  alertOverlay.appendChild(alertBox);
  alertContainer.appendChild(alertOverlay);
}
