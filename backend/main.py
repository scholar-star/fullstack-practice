from fastapi import FastAPI, Depends
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Boolean, Date
from datetime import date
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from starlette.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv(".env.local")  # .env 파일 로드

DATABASE_URL = os.getenv("DATABASE_URL")
CLIENT_URL = os.getenv("CLIENT_URL")
# 단일 스레드 환경에서 DB 사용
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread":False}, echo=True)
# 세션 팩토리 생성 -> 세션 객체를 자동적으로 생성
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Todo(Base):
    __tablename__ = "todo"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    content = Column(String)
    status = Column(Boolean, default=False)
    created_at = Column(Date, default=date.today)

class TodoRequest(BaseModel):
    content: str
    status: bool = False
    created_at: date = date.today()

class TodoResponse(BaseModel):
    id: int
    content: str
    status: bool
    created_at: date

def get_db():
    db = SessionLocal()
    try:
        yield db # DB 세션을 넘겨주며, 제어권을 호출자에게 넘김(동기)
    finally:
        db.close()

# 테이블을 만든 후 DB와 연결하여 테이블 생성
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[CLIENT_URL],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/todos") # 굳이 query parameter를 URL에 명시할 필요는 없음.
def get_todos(date: str, filter: str, search: str, db: Session = Depends(get_db)):
    todos = db.query(Todo).filter(Todo.created_at == date)
    if filter == 'progress':
        todos = todos.filter(Todo.status == False)
    elif filter == 'completed':
        todos = todos.filter(Todo.status == True)

    if search:
        todos = todos.filter(Todo.content.contains(search))
        
    todoDTOs = []
    for todo in todos:
        todoDTOs.append(TodoResponse(id=todo.id, content=todo.content, status=todo.status, created_at=todo.created_at))
    return todoDTOs

@app.get("/todos/{id}")
def get_todo(id: int, db: Session = Depends(get_db)):
    todo = db.query(Todo).filter(Todo.id == id).first()
    if not todo:
        return {"error": "Todo not found"}
    return TodoResponse(id=todo.id, content=todo.content, status=todo.status, created_at=todo.created_at)

@app.post("/todos")
def create_todo(todo_dto: TodoRequest, db: Session = Depends(get_db)):
    new_todo = Todo(content=todo_dto.content, status=todo_dto.status)
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    return TodoResponse(id=new_todo.id, content=new_todo.content, status=new_todo.status, created_at=new_todo.created_at)

@app.put("/todos/{id}")
def update_todo(id: int, todo_dto: TodoRequest, db: Session = Depends(get_db)):
    todo = db.query(Todo).filter(Todo.id == id).first()
    if not todo:
        return {"error": "Todo not found"}
    todo.content = todo_dto.content
    todo.status = todo_dto.status
    db.commit()
    db.refresh(todo)
    return TodoResponse(id=todo.id, content=todo.content, status=todo.status, created_at=todo.created_at)

@app.delete("/todos/{id}")
def delete_todo(id: int, db: Session = Depends(get_db)):
    todo = db.query(Todo).filter(Todo.id == id).first()
    if not todo:
        return {"error": "Todo not found"}
    db.delete(todo)
    db.commit()
    return {"message": "Todo deleted successfully"}
