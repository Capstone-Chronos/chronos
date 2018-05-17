import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { TimelineWrapper, SankeyWrapper, Choropleth } from '../components';

const ChartRoutes = () => {
  return (
    <Switch>
      <Route
        exact
        path="/edit/timeline/:id/:title"
        component={TimelineWrapper}
      />
      <Route exact path="/edit/timeline/:id/" component={TimelineWrapper} />
      <Route path="/edit/timeline/" component={TimelineWrapper} />

      <Route exact path="/edit/sankey/:id/:title" component={SankeyWrapper} />
      <Route exact path="/edit/sankey/:id/" component={SankeyWrapper} />
      <Route path="/edit/sankey/" component={SankeyWrapper} />

      <Route exact path="/edit/map/:id/:title" component={Choropleth} />
      <Route exact path="/edit/map/:id/" component={Choropleth} />
      <Route path="/edit/map/" component={Choropleth} />

      <Route
        exact
        path="/edit/timeline/:id/:title"
        component={TimelineWrapper}
      />
      <Route exact path="/view/timeline/:id/" component={TimelineWrapper} />
      <Route path="/view/timeline/" component={TimelineWrapper} />

      <Route exact path="/view/sankey/:id/:title" component={SankeyWrapper} />
      <Route exact path="/view/sankey/:id/" component={SankeyWrapper} />
      <Route path="/view/sankey/" component={SankeyWrapper} />

      <Route exact path="/view/map/:id/:title" component={Choropleth} />
      <Route exact path="/view/map/:id/" component={Choropleth} />
      <Route path="/view/map/" component={Choropleth} />

      <Route
        exact
        path="/show/timeline/:id/:title"
        component={TimelineWrapper}
      />
      <Route exact path="/show/timeline/:id/" component={TimelineWrapper} />
      <Route path="/show/timeline/" component={TimelineWrapper} />

      <Route exact path="/show/sankey/:id/:title" component={SankeyWrapper} />
      <Route exact path="/show/sankey/:id/" component={SankeyWrapper} />
      <Route path="/show/sankey/" component={SankeyWrapper} />

      <Route exact path="/show/map/:id/:title" component={Choropleth} />
      <Route exact path="/show/map/:id/" component={Choropleth} />
      <Route path="/show/map/" component={Choropleth} />
    </Switch>
  );
};

export default ChartRoutes;
