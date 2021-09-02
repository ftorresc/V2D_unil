var chart = c3.generate({
    data: {
        columns: [
            ['distancegroups', 1148, 1123, 0,],
            ['distance16', 0,2325, 1436,],
            ['distancequarter', 0, 0, 920,],
            ['distancesemi', 0, 0, 920,],
            ['distancefinals', 0, 0, 0,] 
        ],
        type: 'bar',
        groups: [
            ['distancegroups', 'distance16', 'distancequarter', 'distancesemi', 'distancefinals'], 
        ],
        order: null
    },
    grid: {
        y: {
            lines: [{value:30000000}]
        }
    },
    axis: {
        x: {
            type: 'category',
            categories: ['finland', 'portugal', 'italy']
        }
    }
});