import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { accentTokens } from '@/lib/accents';
import { FigureWithDescription } from '@/components/accessibility/FigureWithDescription';
import { isRenderableMetric, measurementLevels, metricsByLevel } from '@/data/metrics';

/**
 * Charts the *evidence position*, not results: how many metrics exist at each
 * measurement level and how many are confirmed. It stays honest by construction —
 * the only thing plotted is a count of metrics in the data file.
 */
export function EvidenceCoverageChart() {
  const data = measurementLevels.map((level) => {
    const metrics = metricsByLevel(level.id);
    const verified = metrics.filter(isRenderableMetric).length;
    return {
      level: level.title,
      shortLevel: `L${level.index}`,
      Confirmed: verified,
      'Being validated': metrics.length - verified,
    };
  });

  const description = `Bar chart of tracked metrics by measurement level. ${data
    .map(
      (entry) =>
        `${entry.level}: ${entry.Confirmed} confirmed, ${entry['Being validated']} being validated`,
    )
    .join('. ')}.`;

  const dataTable = (
    <table>
      <caption>Metric evidence position by measurement level</caption>
      <thead>
        <tr>
          <th scope="col">Measurement level</th>
          <th scope="col">Confirmed</th>
          <th scope="col">Being validated</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry) => (
          <tr key={entry.level}>
            <th scope="row">{entry.level}</th>
            <td>{entry.Confirmed}</td>
            <td>{entry['Being validated']}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <FigureWithDescription
      title="Evidence position by measurement level"
      description={description}
      dataTable={dataTable}
      visibleCaption
    >
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, bottom: 8, left: -18 }}>
            <CartesianGrid stroke="rgba(15,23,41,0.08)" vertical={false} />
            <XAxis
              dataKey="shortLevel"
              stroke="#5a6780"
              tick={{ fontSize: 12, fill: '#5a6780' }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(15,23,41,0.12)' }}
            />
            <YAxis
              stroke="#5a6780"
              tick={{ fontSize: 12, fill: '#5a6780' }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                background: '#ffffff',
                border: '1px solid rgba(15,23,41,0.12)',
                borderRadius: 12,
                color: '#0f1729',
                fontSize: 13,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12, color: '#5a6780' }} />
            <Bar dataKey="Confirmed" stackId="a" fill={accentTokens.cyan.hex} radius={[0, 0, 0, 0]} />
            <Bar
              dataKey="Being validated"
              stackId="a"
              fill="rgba(155,164,191,0.35)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </FigureWithDescription>
  );
}
