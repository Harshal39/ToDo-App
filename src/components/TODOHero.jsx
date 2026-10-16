function TODOHero({todos_completed, total_todos}){
     return (
        <section className = "todohero_section">
            <div>
                <p className="text_large">Task Done</p>
                <p className="text_small">Keep It Up</p>
            </div>
            <div>
                {todos_completed}/{total_todos}
            </div>
        </section>
     );
};

export default TODOHero;

//Passed props as an argument for dynamic data.