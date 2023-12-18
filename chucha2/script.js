// React создает кнопку и сохраняет ее у себя
const Button = React.createElement("button", { 
  onClick: () => alert("Hello world")
}," P R E S S ! ! ! ");

// React с помощью метода render, вставляет созданную кнопку в DOM
ReactDOM.render(Button, document.getElementById("root"));