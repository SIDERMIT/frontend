<template>
  <div class="GlobalResults">
    <div class="header">          
        <h1>Overall optimization results</h1>
        <p>Stage 1</p>
    </div>
    <section>
        <div class="grid title">
            <h2>Processed networks</h2>
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
            <table>
                <tbody>
                    <tr>
                        <th><span>Network</span></th>
                        <th><a><span>𝑉𝑅𝐶<br>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝐶𝑂<br>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝐶𝐼<br>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝐶𝑈<br>[𝑈𝑆$/h − 𝑝𝑎𝑥]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝑡v<br>[𝑚𝑖𝑛/𝑝𝑎𝑥]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝑡w<br>[𝑚𝑖𝑛/𝑝𝑎𝑥]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝑡a<br>[𝑚𝑖𝑛/𝑝𝑎𝑥]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝑇<br>[𝑡𝑟𝑎𝑛𝑠/𝑝𝑎𝑥]</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝐵<br>bus1</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝐾<br>bus1</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝑙<br>bus1</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝐵<br>metro1</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝐾<br>bus1</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝑙<br>bus1</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝐵<br>metro1</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝐾<br>bus1</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝑙<br>bus1</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
                        <th><a><span>𝐵<br>metro1</span><span class="btn-filter-column material-icons">unfold_more</span></a></th>
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
                    <tr>
                        <td><a href="#">Network 2</a></td>
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
    <footer>
        <div class="container full grid">
            <div class="left-content">
                <p class="info">5 processed networks, 2 networks with errors</p>
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
  name: 'GlobalResults',
  components: {
    
  }
}
</script>
