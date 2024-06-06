"use client";
import TodoList from "@/components/tasks/tasks";

export default function Contact() {
  return (
    <div>
      <h1>Contact</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit,
        sed quo velit non laudantium nemo esse itaque doloribus minima eaque
        corporis atque eos similique nesciunt animi expedita fugit omnis ex?
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </p>
      {/* <center>
        <ul>
          <li>
            <input type="checkbox" id="task1" />
            <label for="task1">Hero section</label>
          </li>
          <li>
            <input type="checkbox" id="task2" />
            <label for="task2">משימה 2: עשה את זה</label>
          </li>
          <li>
            <input type="checkbox" id="task3" />
            <label for="task3">משימה 3: עשה גם את זה</label>
          </li>
        </ul>
      </center> */}
      <center>
        <TodoList />
      </center>
    </div>
  );
}
