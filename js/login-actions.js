function pwd_handler(form)
{
    form.md5password.value = md5(form.password.value);
    form.password.value = '';
    localStorage.setItem("log", 1);
}
