document.addEventListener('DOMContentLoaded', function() {
    const headers = document.querySelectorAll('.section-header');
    
    headers.forEach(header => {
        header.addEventListener('click', function() {
            const section = this.parentElement;
            const content = section.querySelector('.section-content');
            const icon = this.querySelector('.toggle-icon i');
            
            content.classList.toggle('expanded');
            
            if (content.classList.contains('expanded')) {
                icon.classList.replace('fa-plus', 'fa-minus');
            } else {
                icon.classList.replace('fa-minus', 'fa-plus');
            }
        });
    });

    // Location fetching
    document.getElementById("getLocationBtn").addEventListener("click", () => {
        const locationDisplay = document.getElementById("locationDisplay");
    
        if (navigator.geolocation) {
            locationDisplay.textContent = "Fetching location...";
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude.toFixed(5);
                    const lng = position.coords.longitude.toFixed(5);
                    locationDisplay.textContent = `Latitude: ${lat}, Longitude: ${lng}`;
                },
                (error) => {
                    locationDisplay.textContent = "Location access denied or unavailable.";
                }
            );
        } else {
            locationDisplay.textContent = "Geolocation is not supported by your browser.";
        }
    });

    // Report button
    // document.getElementById('reportBtn').addEventListener('click', function() {
    //     // Collect form data
    //     const incidentDetails = {
    //         department: document.getElementById('options2').value,
    //         hazardLevel: document.querySelector('input[name="hazardLevel"]:checked')?.value || 'Not specified',
    //         description: document.getElementById('message1').value,
    //         contactName: document.getElementById('name2').value,
    //         contactNumber: document.getElementById('email2').value,
    //         location: document.getElementById('locationDisplay').textContent
    //     };

    //     // Generate tracking ID
    //     const trackingId = 'TR-' + Math.random().toString(36).substr(2, 8).toUpperCase();
        
    //     // Store data (in a real app, you would send this to a server)
    //     sessionStorage.setItem('emergencyReport', JSON.stringify({
    //         ...incidentDetails,
    //         trackingId: trackingId,
    //         timestamp: new Date().toLocaleString()
    //     }));

    //     // Show confirmation (in a real app, redirect to confirmation page)
    //     const trackingBox = document.getElementById('tracking-id-display');
    //     trackingBox.innerHTML = `✅ Report submitted successfully! <br> <strong>Your Tracking ID:</strong> ${trackingId}`;
    //     trackingBox.style.display = 'block';

    // });



    // Report button
document.getElementById('reportBtn').addEventListener('click', function () {
    const checkbox = document.getElementById('terms-checkbox');
    const trackingBox = document.getElementById('tracking-id-display');

    // Check if the checkbox is NOT checked
    if (!checkbox.checked) {
        trackingBox.innerHTML = `<span style="color: red;">⚠️ Please confirm the information before submitting.</span>`;
        trackingBox.style.display = 'block';
        return; // Stop here if checkbox not checked
    }

    // ✅ Collect form data
    const incidentDetails = {
        department: document.getElementById('options2').value,
        hazardLevel: document.querySelector('input[name="hazardLevel"]:checked')?.value || 'Not specified',
        description: document.getElementById('message1').value,
        contactName: document.getElementById('name2').value,
        contactNumber: document.getElementById('email2').value,
        location: document.getElementById('locationDisplay').textContent
    };

    // ✅ Generate tracking ID
    const trackingId = 'TR-' + Math.random().toString(36).substr(2, 8).toUpperCase();

    // ✅ Store data (in a real app, you'd send to a server)
    sessionStorage.setItem('emergencyReport', JSON.stringify({
        ...incidentDetails,
        trackingId: trackingId,
        timestamp: new Date().toLocaleString()
    }));

    // ✅ Show confirmation
    trackingBox.innerHTML = `✅ Report submitted successfully! <br><strong>Your Tracking ID:</strong> ${trackingId}`;
    trackingBox.style.display = 'block';
});


// Function to show the notification
function showNotification() {
    if (Notification.permission === "granted") {
      new Notification("Issue Reported ✅", {
        body: "Thank you for helping keep the neighborhood safe!",
        icon: "https://cdn-icons-png.flaticon.com/512/190/190411.png"
      });
      console.log("Notification triggered successfully. Report issued.");
    } else {
      console.log("Notification permission not granted.");
    }
  }
  
  // Event listener for the button
  document.getElementById('reportBtn').addEventListener('click', function (e) {
    e.preventDefault();
    console.log("Report button clicked.");
  
    // Check permission first
    if (Notification.permission === "granted") {
      showNotification(); // Show notification if already allowed
    } else if (Notification.permission !== "denied") {
      // Request permission only when the button is clicked
      Notification.requestPermission().then(permission => {
        console.log("Notification permission:", permission);
        if (permission === "granted") {
          showNotification(); // Show notification after permission granted
        } else {
          alert("Please enable notifications to receive confirmation alerts.");
        }
      });
    } else {
      alert("Notifications were blocked. Please enable them in browser settings.");
    }
  });
  

});