$(function () {
  // 点击注册账号
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  // 点击登入
  $("#link_login").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });

  // 从 LayUI 中获取 form 对象
  var form = layui.form;
  var layer = layui.layer;

  // 自定义校验规则
  form.verify({
    // 自定义密码校验规则 pwd
    pwd: [/^[\S]{6,12}$/, "密码必须 6 到 12 位,且不能出现空格"],
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容,还需要拿到密码框中的内容,然后进行判断
      var pwd = $(".reg-box [name=password]").val();
      if (pwd !== value) {
        return "两次密码不一致";
      }
    },
  });

  // 监听注册表单的提交事件
  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    $.post(
      "/api/reguser",
      {
        username: $("#form_reg [name=username]").val(),
        password: $("#form_reg [name=password]").val(),
      },
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("注册成功,请登入");
        // 模拟人的点击行为
        $("#link_login").click();
      }
    );
  });

  // 监听登入表单的提交事件
  $("#form_login").submit(function (e) {
    // 阻止默认提交行为
    e.preventDefault();
    $.ajax({
      url: "/api/login",
      method: "POST",
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("登入失败");
        }
        layer.msg("登入成功");
        //   console.log(res.token)
        // 将 token 保存到 localStorage
        localStorage.setItem("token", res.token);
        // 跳转到主页
        location.href = "/index.html";
      },
    });
  });
});
