define ['spectrum/Renderer', 'coffeerithms/quick_union/WeightedQuickUnionUF'], (Renderer, WeightedQuickUnionUF) ->
    class DynamicConnectivitySimulation
        init : (N) ->
            @dimension = N
            @totalSites = N*N
            @topVirtual = @totalSites
            @bottomVirtual = @totalSites + 1
            @qf1 = new WeightedQuickUnionUF(@totalSites + 2)
            @qf2 = new WeightedQuickUnionUF(@totalSites + 1)
            @sites = [off for col in [0..N-1] for row in [0..N-1]][0]

        ###
        # Converts from row, col to 0 to N -1 index
        ###
        getSiteIndex : (row, col) ->
            return  row * @dimension + col

        getSite : (index) ->
            return [Math.floor(index / @dimension), index % @dimension]

        isConnected : () -> 
            return @qf1.connected @topVirtual, @bottomVirtual

        isFull : (index) ->
            site = @getSite index
            row = site[0]
            col = site[1]
            if @sites[row][col]
                return @qf2.connected @totalSites, index
            return false
        
        isOpen : (index) ->
            site = @getSite index
            row = site[0]
            col = site[1]
            return @sites[row][col]
        
        ###
        # Open a new site
        # If neighboring sites are open, connect them with the newly opened site
        ###
        open : (index) ->
            site = @getSite index 
            row = site[0]
            col = site[1]
            @sites[row][col] = on
            
            # If first row, connect to top virtual
            if row is 0
                @qf1.union @totalSites, index
                @qf2.union @totalSites, index

            # if bottom row, connect to bottom virtual
            if row is @dimension - 1
                @qf1.union @totalSites + 1, index

            # Connect to neighbor sites
            
            # above
            if row > 0
                @union index, index - @dimension 

            # below
            if row < @dimension - 1
                @union index, index + @dimension

            # left
            if col > 0
                @union index, index - 1

            # right
            if col < @dimension - 1
                @union index, index + 1

        ###
        # Try to create a union between to sites
        # The parameters should be two union find indices, eg... 0 to N-1
        ###
        union : (a, b) ->
            bSite = @getSite b
            if @isOpen b 
                @qf1.union a, b
                @qf2.union a, b

    class DynamicConnectivityVisualization extends Renderer
        init : () ->
            @gap = 2 # gap between sites
            @border = 2.5 # border around edges
            @bg = "#222222"
            @stepInterval = 10 # increase this value to slow simulation down 
            @initialDim = 9
            @start @initialDim

        start : (N) ->
            @sim = new DynamicConnectivitySimulation
            @sim.init N
            @siteHeight = (@height - @border * 2 - @gap * (@sim.dimension - 1)) / (@sim.dimension)
            @siteWidth = (@width - @border * 2 - @gap * (@sim.dimension - 1)) / (@sim.dimension)
            
        step : () ->
            if not @sim.isConnected()
                if @stepCount % @stepInterval is 0
                    rnd = Math.floor Math.random() * (@sim.totalSites - 1)
                    # if a site is not open, open it
                    # otherwise try again by calling step again
                    if not @sim.isOpen rnd
                        @sim.open rnd
                    else
                        @step()

        render : () ->
            count = 0
            for r in [0..@sim.sites.length-1]
                row = @sim.sites[r]
                for c in [0..row.length-1]
                    if @sim.isConnected() and not @sim.isFull count
                        @color "#666666"
                    else if @sim.isFull count 
                        @color "#ffffff"
                    else 
                        @color "#666666"

                    col = row[c]
                    x = @border + Math.round (c * @siteWidth + @gap * c)
                    y = @border + Math.round (r * @siteHeight + @gap * r)
                    @rectangle x, y, Math.floor(@siteWidth), Math.floor(@siteHeight), col
                    count++

        onMouseDown : (x, y) ->
            @frame = 0
            if @sim.dimension * 2 > @initialDim * 4  
                @start @initialDim         
            else
                @start @sim.dimension * 2
