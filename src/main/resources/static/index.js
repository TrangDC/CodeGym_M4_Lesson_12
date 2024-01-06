function addNewSmartPhone() {
    //lấy dữ liệu từ form
    let producer = $('#producer').val();
    let model = $('#model').val();
    let price = $('#price').val();

    //gán dữ liệu vào 1 đối tượng
    let newSmartPhone = {
        producer: producer,
        model: model,
        price: price
    };

    //gọi phương thức ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newSmartPhone),

        //tên API
        url: "http://localhost:8080/api/smartphones",
        //xử lý khi thành công
        success: successHandler
    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function successHandler() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/smartphones",

        success: function (data) {
            let content = '<table id="display-list" border="1">' +
                '<tr>\n' +
                '<th>Producer</td>\n' +
                '<th>Model</td>\n' +
                '<th>Price</td>\n' +
                '<th>Delete</td>\n' +
                '</tr>';
            for (let i = 0; i < data.length; i++) {
                content += getSmartphone(data[i]);
            }
            content += "</table>"
            document.getElementById('smartphoneList').innerHTML = content;
            document.getElementById('smartphoneList').style.display = "block";
            document.getElementById('add-smartphone').style.display = "none";
            document.getElementById('display-create').style.display = "block";
            document.getElementById('title').style.display = "block";
        }
    })
}

function displayFormCreate() {
    document.getElementById("title").style.display = "none";
    document.getElementById("display-create").style.display = "none";
    document.getElementById("smartphoneList").style.display = "none";
    document.getElementById("add-smartphone").style.display = "block";
}

function getSmartphone(smartphone) {
    return `<tr>
            <td>${smartphone.producer}</td>
            <td>${smartphone.model}</td>
            <td>${smartphone.price}</td>` +
            `<td class="btn"><button class="deleteSmartphone" onclick="deleteSmartphone(${smartphone.id})">Delete</button></td>
            </tr>`;
}

function deleteSmartphone(id) {
    $.ajax({
        type: 'DELETE',
        url: 'http://localhost:8080/api/smartphones/${id}',
        success: successHandler
    });
}