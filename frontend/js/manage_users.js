id = localStorage.reqId;

console.log(id);
$.ajax({
  type: "POST",
  url: "http://127.0.0.1:3000/users/requestedUsers",
  contentType: "application/json",
  data: JSON.stringify({
    id: id,
  }),
  dataType: "json",
  success: function (result) {
    result.forEach((ele) => {
      document.querySelector("tbody").innerHTML += `
        <tr>
        <th scope="row" class="ps-4">
            <div class="form-check font-size-16"><input type="checkbox" class="form-check-input" id="contacusercheck2" /><label class="form-check-label" for="contacusercheck2"></label></div>
        </th>
        <td><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" class="avatar-sm rounded-circle me-2" /><a href="#" class="text-body">${ele.name}</a></td>
        <td><span class="badge badge-soft-info mb-0">-</span></td>
        <td>${ele.email}</td>
        <td>${ele.mobile}</td>
        <td>
            <ul class="list-inline mb-0">
                <li class="list-inline-item">
                    <a href="javascript:void(0);" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" class="px-2 text-primary"><i class="bx bx-pencil font-size-18"></i></a>
                </li>
                <li class="list-inline-item">
                    <a href="javascript:void(0);" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" class="px-2 text-danger"><i class="bx bx-trash-alt font-size-18"></i></a>
                </li>
                <li class="list-inline-item dropdown">
                    <a class="text-muted dropdown-toggle font-size-18 px-2" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="bx bx-dots-vertical-rounded"></i></a>
                    <div class="dropdown-menu dropdown-menu-end">
                        <a class="dropdown-item" href="#">Action</a><a class="dropdown-item" href="#">Another action</a><a class="dropdown-item" href="#">Something else here</a>
                    </div>
                </li>
            </ul>
        </td>
    </tr>`;
    });
  }
});
