<template>
  <div class="NetworkResults">
    <div class="header">          
        <h1>Optimization results</h1>
        <p>Networks 1</p>
    </div>
    <section>
        <div class="grid title">
            <h2>Overall optimization results</h2>
            <a class="icon-link"><span class="material-icons">help</span></a>
        </div>
    </section>
    <section>
        <div class="grid title">
            <h4>Filter columns</h4>
            <div class="btn-filter">
                <button class="btn neuro">Cost</button>
                <button class="btn neuro active">Users</button>
                <button class="btn neuro">Modes</button>
            </div>
        </div>
        <div class="table">
            <table class="fixed">
                <tbody>
                    <tr>
                        <th><span>Network</span></th>
                        <th><span>𝑉𝑅𝐶<br>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span></th>
                        <th><span>𝐶𝑂<br>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span></th>
                        <th><span>𝐶𝐼<br>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span></th>
                        <th><span>𝐶𝑈<br>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span></th>
                        <th><span>𝑡v<br>[𝑚𝑖𝑛/𝑝𝑎𝑥]</span></th>
                        <th><span>𝑡w<br>[𝑚𝑖𝑛/𝑝𝑎𝑥]</span></th>
                        <th><span>𝑡a<br>[𝑚𝑖𝑛/𝑝𝑎𝑥]</span></th>
                        <th><span>𝑇<br>[𝑡𝑟𝑎𝑛𝑠/𝑝𝑎𝑥]</span></th>
                        <th><span>𝐵<br>bus1</span></th>
                        <th><span>𝐾<br>bus1</span></th>
                        <th><span>𝑙<br>bus1</span></th>
                        <th><span>𝐵<br>metro1</span></th>
                        <th><span>𝐾<br>bus1</span></th>
                        <th><span>𝑙<br>bus1</span></th>
                        <th><span>𝐵<br>metro1</span></th>
                        <th><span>𝐾<br>bus1</span></th>
                        <th><span>𝑙<br>bus1</span></th>
                        <th><span>𝐵<br>metro1</span></th>
                    </tr>
                    <tr>
                        <td><a href="#">Network 1</a></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                        <td><span>0.1</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
    <section>
        <div class="grid-results">
                <div class="title grid full">
                    <div class="grid">
                        <h2>Result details</h2>
                        <a class="icon-link"><span class="material-icons">help</span></a>
                    </div>
                    <button class="btn neuro"><span class="material-icons">visibility</span><span>View all</span></button>
                </div>
                <div class="graph-view">
                    <div class="search"><input type="search"></div>
                    <div class="graph-container"></div>
                </div>
                <div class="table">
                    <table class="result-details">
                        <thead>
                            <tr>
                                <th><span>Route ID</span></th>
                                <th><a><span>𝑓<br>[𝑣𝑒h/h]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                                <th><a><span>𝐾<br>[𝑝𝑎𝑥/𝑣𝑒h]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                                <th><a><span>𝐵<br>[𝑣𝑒h]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                                <th><a><span>𝑡𝑐<br>[𝑚𝑖𝑛]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                                <th><a><span>𝐶𝑜<br>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                                <th><a><span>𝜆𝑚𝑖𝑛</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody class="collapse-row active">
                            <tr class="main-row">
                                <td><span>506</span></td>
                                <td><span>327</span></td>
                                <td><span>100</span></td>
                                <td><span>0.1</span></td>
                                <td><span>0.1</span></td>
                                <td><span>0.1</span></td>
                                <td><span>0.1</span></td>
                                <td><div class="grid g2 min"><button class="btn icon flat active"><span class="material-icons">vignette</span></button><button class="btn icon flat"><span class="material-icons">arrow_drop_up</span></button></div></td>
                            </tr>
                            <tr>
                                <td>
                                    <table class="subtable">
                                        <thead>
                                            <tr>
                                                <th colspan="3">
                                                    <div class="grid">
                                                        <span>Forward</span>
                                                        <button class="btn icon flat active"><span class="material-icons">visibility</span></button>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th><span>Node I</span></th>
                                                <th><span>Node j</span></th>
                                                <th><span>𝜆</span></th>
                                            </tr>
                                            <tr>
                                                <td><span>2</span></td>
                                                <td><span>3</span></td>
                                                <td><span>0.8</span></td>
                                            </tr>
                                            <tr>
                                                <td><span>2</span></td>
                                                <td><span>3</span></td>
                                                <td><span>0.8</span></td>
                                            </tr>
                                            <tr>
                                                <td><span>2</span></td>
                                                <td><span>3</span></td>
                                                <td><span>0.8</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    <table class="subtable">
                                        <thead>
                                            <tr>
                                                <th colspan="3">
                                                    <div class="grid">
                                                        <span>Return</span>
                                                        <button class="btn icon flat"><span class="material-icons">visibility_off</span></button>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th><span>Node I</span></th>
                                                <th><span>Node j</span></th>
                                                <th><span>𝜆</span></th>
                                            </tr>
                                            <tr>
                                                <td><span>2</span></td>
                                                <td><span>3</span></td>
                                                <td><span>0.8</span></td>
                                            </tr>
                                            <tr>
                                                <td><span>2</span></td>
                                                <td><span>3</span></td>
                                                <td><span>0.8</span></td>
                                            </tr>
                                            <tr>
                                                <td><span>2</span></td>
                                                <td><span>3</span></td>
                                                <td><span>0.8</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                        <tbody class="collapse-row">
                            <tr class="main-row">
                                <td><span>506</span></td>
                                <td><span>327</span></td>
                                <td><span>100</span></td>
                                <td><span>0.1</span></td>
                                <td><span>0.1</span></td>
                                <td><span>0.1</span></td>
                                <td><span>0.1</span></td>
                                <td><div class="grid g2 min"><button class="btn icon flat"><span class="material-icons">visibility_off</span></button><button class="btn icon flat"><span class="material-icons">arrow_drop_down</span></button></div></td>
                            </tr>
                            <tr>
                                <td>
                                    <table class="subtable">
                                        <thead>
                                            <tr>
                                                <th colspan="3">
                                                    <div class="grid">
                                                        <span>Return</span>
                                                        <button class="btn icon flat"><span class="material-icons">visibility_off</span></button>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th><span>Node I</span></th>
                                                <th><span>Node j</span></th>
                                                <th><span>𝜆</span></th>
                                            </tr>
                                            <tr>
                                                <td><span>2</span></td>
                                                <td><span>3</span></td>
                                                <td><span>0.8</span></td>
                                            </tr>
                                            <tr>
                                                <td><span>2</span></td>
                                                <td><span>3</span></td>
                                                <td><span>0.8</span></td>
                                            </tr>
                                            <tr>
                                                <td><span>2</span></td>
                                                <td><span>3</span></td>
                                                <td><span>0.8</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td>
                                    <table class="subtable">
                                        <thead>
                                            <tr>
                                                <th colspan="3">
                                                    <div class="grid">
                                                        <span>Forward</span>
                                                        <button class="btn icon flat"><span class="material-icons">visibility_off</span></button>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th><span>Node I</span></th>
                                                <th><span>Node j</span></th>
                                                <th><span>𝜆</span></th>
                                            </tr>
                                            <tr>
                                                <td><span>2</span></td>
                                                <td><span>3</span></td>
                                                <td><span>0.8</span></td>
                                            </tr>
                                            <tr>
                                                <td><span>2</span></td>
                                                <td><span>3</span></td>
                                                <td><span>0.8</span></td>
                                            </tr>
                                            <tr>
                                                <td><span>2</span></td>
                                                <td><span>3</span></td>
                                                <td><span>0.8</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        </div>
    </section>
    <footer>
        <div class="container full grid">
            <div class="left-content">
                <p class="info">300 registered services</p>
            </div>
            <div class="right-content">
                <button class="btn">
                    <span class="material-icons">chevron_left</span>
                    <span>Back</span>
                </button>
                <button class="btn">
                    <span>Download data</span>
                    <span class="material-icons">get_app</span>
                </button>
            </div>
        </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'NetworkResults',
  components: {
    
  }
}
</script>
