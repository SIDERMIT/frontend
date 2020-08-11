<template>
    <div class="NewCityStep2">
        <div class="header">
            <h1>Demand definition</h1>
        </div>
        <section class="grid step2-definition">
            <div>
                <div class="subtitle">
                    <h2>Define symmetric demand by parameters</h2>
                </div>
                <div class="subtitle">
                    <div class="grid center">
                        <h4>Enter parameters (pick hour model)</h4>
                        <a class="icon-link"><span class="material-icons">help</span></a>
                    </div>
                </div>
                <div class="table">
                    <table>
                        <tbody>
                            <tr>
                                <th><span>𝑛</span></th>
                                <th><span>𝑌[𝑝𝑎𝑥/h]</span></th>
                                <th><span>a</span></th>
                                <th><span>𝛼</span></th>
                                <th><span>𝛽</span></th>
                            </tr>
                            <tr>
                                <td><input type="text" placeholder="0"/></td>
                                <td><input type="text" placeholder="0"/></td>
                                <td><input type="text" placeholder="0"/></td>
                                <td><input type="text" placeholder="0"/></td>
                                <td><input type="text" placeholder="0"/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="checker">
                    <div class="grid checker-body">
                        <span class="material-icons icon ok">check</span>
                        <span class="text">Table correctly defined</span>
                    </div>
                </div>
                <div class="flex flex-end">
                    <button class="btn"><span class="material-icons">edit</span><span>Edit parameters</span></button>
                </div>
                <button class="btn full main">Render OD matrix</button>
            </div>
            <div class="graph-container"></div>
        </section>
        <section>
            <h2>OD Matrix</h2>
            <div class="subtitle">
                <h4>Transport modes and users settings for the city</h4>
            </div>
            <div class="empty-box">
                <p>You have not generated your matrix yet, you can import the data from a csv file.</p>
                <a href="#" class="btn">
                    <span class="material-icons">publish</span>
                    <span>Import CSV file</span>
                </a>
            </div>
        </section>
        <footer>
            <div class="container full grid">
                <div class="left-content">
                </div>
                <div class="right-content">
                    <a class="btn">
                        <span class="material-icons">chevron_left</span>
                        <span>Back</span>
                    </a>
                    <a class="btn">
                        <span>Next</span>
                        <span class="material-icons">chevron_right</span>
                    </a>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
  name: 'NewCityStep2',
  components: {
    
  }
}
</script>
