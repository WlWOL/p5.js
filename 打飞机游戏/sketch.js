var WIDTH=400,HEIGHT=500;
var score=0;
var speed=2;
var level=0;
var game_start=0;
var game_over=0;
var creat_enemy_fluence=1000;
var creat_bullet_fluence=400;
var start_time;
var end_time=0;
var current_time_1=0;
var current_time_2=0;
function setup() { 
  createCanvas(WIDTH,HEIGHT);
	EnemyList=[];
	BulletList=[];
} 

function draw() 
{	//x++
start_time=millis();
game_setting_and_start();
level_setting();
shoot();
creat_enemy()
show_enemy();
show_bullet();
drawmyplane(mouseX,mouseY);
collision();
replay();
	current_time_1=current_time_1+(start_time-end_time);
	current_time_2=current_time_2+(start_time-end_time);
	end_time=millis();
	current_time_1=current_time_1+(end_time-start_time);
	current_time_2=current_time_2+(end_time-start_time);
}
function shoot()					//发射子弹
{if(current_time_1>creat_bullet_fluence)
	{
		if (mouseIsPressed) 
		{			
		BulletList.push(draw_bullet(mouseX,mouseY));			
 		 } 	
		current_time_1=0;
	}
}
function creat_enemy()
	{
		if(current_time_2>creat_enemy_fluence)
		{
		if(game_start)
		{
		EnemyList.push(draw_single_enemy(random(WIDTH),20));
		}
		current_time_2=0;
		}
	}
function game_setting_and_start()
{
	background(225);
	text('enemy_on_screen:'+EnemyList.length, 280, 30);
	text('bullet_on_screen:'+BulletList.length, 150, 30);
	text('score:'+score, 0, 30);
	text('level:'+level, 80, 30);
 if(!game_start)
 {
	text('Plane Game', 170, 70);
	text('Use your mouse to move',140, 90);
	text('Press your mouse to shoot',140, 110);
	text('press any key to start',150, 150);
 }
	if(!game_start&&keyIsPressed)
	{
		game_start=1;	
		EnemyList.splice(0,EnemyList.length);
		BulletList.splice(0,BulletList.length);
	}
}
function level_setting()
{
	level=floor(score/10);
		para=0.5*level;
	if(level<8)
	{
		speed=2+para;
		creat_bullet_fluence=400/(1+para);
	}
	creat_enemy_fluence=1000/(1+2*para);
}
function replay()
{
	if(game_over)
	{
		text("game over", 170, 100);
		text("press any key to restart",150,130)
		score=0;
	}
	if(game_over&&keyIsPressed)
	{
		game_over=0;
		EnemyList.splice(0,EnemyList.length);
		BulletList.splice(0,BulletList.length);
	}
}

function collision()
{
	for(var i=0;i<EnemyList.length;i++)
	{
		
		var distance_to_plane_y=abs(EnemyList[i].y-mouseY);
		var distance_to_plane_x=abs(EnemyList[i].x-mouseX);
		
		var distance_to_plane=sqrt(pow(distance_to_plane_y, 2)+pow(distance_to_plane_x, 2));
		
		if(distance_to_plane<80)	//飞机间碰撞检测
		{ 
			 game_over=1;
		}
			else 
			{
					for(var j=0;j<BulletList.length;j++)
			{
				var distance_to_bullet_y=abs(EnemyList[i].y-BulletList[j].y);
				var distance_to_bullet_x=abs(EnemyList[i].x-BulletList[j].x);
				var distance_to_bullet=sqrt(pow(distance_to_bullet_y, 2)+pow(distance_to_bullet_x, 2));
			
								if(distance_to_bullet<50)	//飞机间碰撞检测
										{ 
												EnemyList.splice(i,1);
												BulletList.splice(j,1); //将子弹和敌机移除
												score++;				//分数+1
											break;
											
										}
			}	
			}
	
	}
}




function Enemy(x,y)
{this.x=x;
 this.y=y;
}
function draw_single_enemy(x,y)
{
	var enemy_1=new Enemy(x,y)
	push();
	noStroke();
//	ellipse(x, y, 160, 160);      //test
	fill(color(204, 102, 0));
	triangle(x-40, y, x+40, y, x, y+30);
	fill(color(204, 153, 0));
//	ellipse(x, y, 100, 100);			//test
	triangle(x-20, y-15, x+20, y-15, x, y+50);
	fill(color(153, 51, 0));
	triangle(x-20, y-15, x, y-15, x-10, y-30);
	triangle(x+20, y-15, x, y-15, x+10, y-30);
	
	pop();
	return enemy_1;
}	
function show_enemy()
{	
	for(var i=0;i<EnemyList.length;i++)
	{
		EnemyList[i].y=EnemyList[i].y+speed;
		draw_single_enemy(EnemyList[i].x,EnemyList[i].y)
		if(EnemyList[i].y>HEIGHT)
		{
		 EnemyList.splice(i,1);
		}
	}
}


function drawmyplane(x,y)				//画自己
{
	y=y+10;
	push();
	noStroke();
	fill(color(0, 102, 133));
	triangle(x-40, y, x+40, y, x, y-30);
	fill(color(0, 153, 133));
	triangle(x-20, y-15, x+20, y-15, x, y-50);
	fill(color(0, 51, 133));
	triangle(x-20, y-15, x, y-15, x-10, y+15);
	triangle(x+20, y-15, x, y-15, x+10, y+15);
//	ellipse(x, y, 55, 55);
	pop()
}	



function show_bullet()
{
for(var i=0;i<BulletList.length;i++)
	{
		BulletList[i].y=BulletList[i].y-speed;
		draw_bullet(BulletList[i].x,BulletList[i].y)
		if(BulletList[i].y<0)
		{
			
		 BulletList.splice(i,1);
			
		}
	}
}
function Bullet(x,y)
{
	this.x=x;
 	this.y=y;
}
function draw_bullet(x,y)
{

	var bullet_1=new Bullet(x,y);
	push();
	fill(color(0, 51, 133));
	triangle(x-5, y-40, x+5, y-40, x, y-60);
	pop();
	return bullet_1;
	//在鼠标偏上部分生成子弹，随后让其运动
}

