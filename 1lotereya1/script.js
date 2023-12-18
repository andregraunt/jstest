ajax({
			"method":"get",
			"url":"js/data.json",
			"success":function(datas){
				var data = datas.dataInfo
				var list = document.getElementsByClassName('list')[0];
				var str = '';
				// Отрисовка данных
				data.forEach(function(v){
					str+=`<li>
							<img src="${v.imgUrl}"/>
							<span style="background:${v.color};">${v.zt}</span>
							<p style="background:${v.color};">${v.tit}</p>
							<p style="background:${v.color};">${v.tit1}</p>
						  </li>`;
				})
				
				list.innerHTML = str;
				// Получаем элементы страницы
				var liList = list.getElementsByTagName('li');
				var btn = document.getElementsByClassName('star')[0]
				
				// Заранее объявляем нижний индекс и две переменные для получения таймера
				var count = 0;
				var timer = null;
				var timer1 = null;
				
				// Событие клика
				btn.addEventListener('click',function(){
					liList[count].style.borderColor='yellow';
                      // Отключить после нажатия
				   	  btn.disabled = 'true';
				   	  // Вызов таймера
				      timer = setInterval(auto,100);
				      
				      // Медленно очищаем первый таймер через 5 секунд
				      setTimeout(function(){
				      	 clearInterval(timer);
                       // Затем снова вызываем, скорость становится меньше
				      	 timer1 = setInterval(auto,500)
				      },5000)
				      
				      // Вызов функции остановки через 10 секунд
				      setTimeout(stop,10000);
				      
				})
				
				
// Функция переключения стилей
				function auto(){
					// Каждый раз определяем, меньше ли длина данных, и сбрасываем на ноль после несоблюдения условий и начинаем заново
					if(count < liList.length-1){
						count++;
					}else{
						count = 0;
					}
					// Очистить все стили
				   for (var i = 0 ; i < liList.length ; i++) {
				   	   liList[i].style.borderColor='';
				   }
				   // Добавляем стиль к указанному элементу
				   liList[count].style.borderColor='yellow';
				   
				}
				// Получаем элементы страницы
				var mark = document.getElementsByClassName('mark')[0];
				var jp = document.getElementsByClassName('jiangPin')[0];
				var que = document.getElementsByClassName('que')[0];
				
				
				
				// Остановить функцию
				function stop(){
					
					clearInterval(timer1);// Очищаем таймер
					// Изменить состояние
					btn.disabled = ''
					var str = '';
                    // Рендерим нарисованные данные
                    for (var i = count ; i < count+1 ; i++) {
                    	 str+=`<li>
							<img src="${data[i].imgUrl}"/>
							<span style="background:${data[i].color};">${data[i].zt}</span>
							<p style="background:${data[i].color};">${data[i].tit}</p>
							<p style="background:${data[i].color};">${data[i].tit1}</p>
						  </li>`;
                    }
					jp.innerHTML = str;
					// Отображаем маскирующий слой
					mark.style.display='block';
					
					
					// Щелкните для подтверждения, чтобы скрыть слой маски
					que.onclick = function(){
					  mark.style.display='none';
				    }
					
					
				}
				
				
				
			}
		});

		