function ResetValues() {
    document.getElementById("Name").value = "";
    document.getElementById("Surname").value = "";
    document.getElementById("Phone").value = "";
    document.getElementById("Ubication").value = "";
    document.getElementById("Email").value = "";
    document.getElementById("textarea").value = "";
}

const Dialog = document.getElementById("Dialog");

function Send(e) {
    const Name = document.getElementById("Name").value;
    const Surname = document.getElementById("Surname").value;
    const Phone = document.getElementById("Phone").value;
    const Ubication = document.getElementById("Ubication").value;
    const Email = document.getElementById("Email").value;
    const textarea = document.getElementById("textarea").value;

    // Validación de campos
    if (Name !== "" && Surname !== "" && Phone !== "" && Ubication !== "" && Email !== "" && textarea !== "") {
        if (ValidateEmail(Email)) {
            fetch('/', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Name, Surname, Phone, Ubication, Email, textarea })
            })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    ValidCheck();
                } else {
                    FaildCheck();
                }
            })
            .catch(error => {
                console.error('Error:', error);
                FaildCheck();
            });
        } else {
            FaildCheck("Email is not valid");
        }
    } else {
        FaildCheck("Please, the fields can not be empty.");
    }

    ResetValues();
}

function ValidateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email); 
}

function FaildCheck(message = "Somenthing went wrong") { 
    Dialog.classList.add("Active");
    Dialog.innerHTML = `
    <div>
        <i class="fa-solid fa-x fa-lg" style="color: #f00505;"></i>
        <p>${message}</p>
    </div>`;
}

function ValidCheck(message = "It was successful") {
    Dialog.classList.remove("Active");
    Dialog.classList.add("Faild");
    Dialog.innerHTML = `
    <div>
        <i class="fa-solid fa-check fa-lg" style="color: #56f202;"></i>
        <p>${message}</p>
    </div>`;
}
