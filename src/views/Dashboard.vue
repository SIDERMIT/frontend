<template>
  <div class="dashboard">
    <div class="header">          
        <h1>Dashboard</h1>
    </div>

    <section class="recent-cities">
        <div class="grid heading">
            <h2>Recently created cities</h2>
            <a class="btn">
                <span>View all (10)</span>
                <span class="material-icons">chevron_right</span>
            </a>
        </div>
        <div class="grid">
            
        </div>
    </section>

    <section class="last-optimization">
        <h2>Last optimizations</h2>
        <div class="table">
            <ul class="optimizations">
                <li class="ready">
                    <div class="icon"><span class="material-icons">check_circle</span></div>
                    <div class="name">
                        <h4>Network 1</h4>
                        <span class="p-min">Stage 2 - My City 1</span>
                    </div>
                    <div class="text"><span class="p-min">Result ready</span></div>
                    <a class="btn neuro"><span>View details</span><span class="material-icons">chevron_right</span></a>
                    <a class="btn neuro"><span>View stages</span><span class="material-icons">chevron_right</span></a>
                </li>
                <li>
                    <div class="icon"><span class="material-icons">timelapse</span></div>
                    <div class="name">
                        <h4>Network 1 copy</h4>
                        <span class="p-min">Stage 2 - My City 1</span>
                    </div>
                    <div class="text"><span class="p-min">Processing...</span></div>
                    <a class="btn neuro"><span>View details</span><span class="material-icons">chevron_right</span></a>
                    <a class="btn neuro"><span>View stages</span><span class="material-icons">chevron_right</span></a>
                </li>
                <li>
                    <div class="icon"><span class="material-icons">schedule</span></div>
                    <div class="name">
                        <h4>Network 2</h4>
                        <span class="p-min">Stage 2 - My City 1</span>
                    </div>
                    <div class="text"><span class="p-min">Enqueued</span></div>
                    <a class="btn neuro"><span>View details</span><span class="material-icons">chevron_right</span></a>
                    <a class="btn neuro"><span>View stages</span><span class="material-icons">chevron_right</span></a>
                </li>
                <li>
                    <div class="icon"><span class="material-icons">more_horiz</span></div>
                    <div class="name">
                        <h4>Network 3</h4>
                        <span class="p-min">Stage 2 - My City 1</span>
                    </div>
                    <div class="text"><span class="p-min">Pending</span></div>
                    <a class="btn neuro"><span>View details</span><span class="material-icons">chevron_right</span></a>
                    <a class="btn neuro"><span>View stages</span><span class="material-icons">chevron_right</span></a>
                </li>
                <li class="error">
                    <div class="icon"><span class="material-icons">error</span></div>
                    <div class="name">
                        <h4>Network 4</h4>
                        <span class="p-min">Stage 2 - My City 1</span>
                    </div>
                    <div class="text"><span class="p-min">With errors</span></div>
                    <a class="btn neuro"><span>View details</span><span class="material-icons">chevron_right</span></a>
                    <a class="btn neuro"><span>View stages</span><span class="material-icons">chevron_right</span></a>
                </li>
            </ul>
        </div>
    </section>
    
    <footer>
        <div class="container full grid">
            <div class="left-content">
            </div>
            <div class="right-content">
                <a href="#" class="btn">
                    <span>Add new city</span>
                    <span class="material-icons">add</span>
                </a>
            </div>
        </div>
    </footer>
  </div>
</template>
